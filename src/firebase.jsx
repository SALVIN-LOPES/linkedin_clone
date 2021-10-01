import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA5au6tXNDSMIwoQ__LRiVvVOOjpkGQxhM",
    authDomain: "linkedin-clone-b1388.firebaseapp.com",
    projectId: "linkedin-clone-b1388",
    storageBucket: "linkedin-clone-b1388.appspot.com",
    messagingSenderId: "410202976144",
    appId: "1:410202976144:web:cdb34ce29026d920fccd15"
  };

// ----------------KEY POINTS---------------
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export {auth,provider,storage};
  export default db;