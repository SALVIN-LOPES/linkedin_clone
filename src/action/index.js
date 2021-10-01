import { auth, provider } from '../firebase.jsx';
import { SET_USER , SET_LOADING_STATUS , GET_ARTICLES } from './actionType';
import { storage } from '../firebase';
import db from '../firebase';


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,//payload : payload.user
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) =>({
    type : GET_ARTICLES,
    payload : payload,
});


export function signInAPI() {
    return ((dispatch) => {
        auth
            .signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user))
                console.log('PAYLOAD = ', payload);
            })
            .catch((error) => {
                alert(error.message);
            })
    })
}

export function getUserAuth() {
    return ((dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    })
}

//sign out : 
export function signOutAPI(dispatch) {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            alert(error.message);
        })
    }
}
//Saving the image in firebase storage : 
export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image != '') {
            const upload = storage
                .ref(`images/${payload.image.name}`)
                .put(payload.image);
            upload.on('state_changed',
                (snapshot) => {
                    console.log('SNAPSHOT = ',snapshot)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    // console.log(`PROGRESS = ${progress}%`);
                    if (snapshot.state === 'RUNNING') {
                        console.log(`PROGRESS = ${progress}%`);
                    }
                }, (error) => console.log(error.code),
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    db.collection('articles').add({
                        actor: {
                            description: payload.user.email,
                            title: payload.user.displayName,
                            date: payload.timestamp,
                            image: payload.user.photoURL,
                        },
                        video: payload.video,
                        sharedImg: downloadURL,
                        comments: 0,
                        description: payload.description,
                    });
                    dispatch(setLoading(false));

                }
            );
        }

        else if (payload.video) {
            db.collection('articles').add({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: '',
                comments: 0,
                description: payload.description,
            })
            dispatch(setLoading(false));
        }
    }
}

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        db.collection('articles')
            .orderBy('actor.date', 'desc')
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data())                
                dispatch(getArticles(payload));
            });
    }
}



