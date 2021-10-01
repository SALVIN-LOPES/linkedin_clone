import { useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { postArticleAPI } from '../action';

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    // console.log('POST MODAL = ', props);
    const reset = (e) => {
        // console.log('E P = ', e);
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    }

    const handleChange = (e) => {
        const image = e.target.files[0];
        if (image === '' || image === undefined) {
            alert(`not an image,the file is of type ${typeof image}`);
            return;
        }
        setShareImage(image);
    }

    const switchAssetArea = (area) => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    }

    const postArticle = (e) =>{
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        const payload = {
            image : shareImage,
            video : videoLink,
            user : props.user,
            description : editorText,
            timestamp : firebase.firestore.Timestamp.now(),
        }
        props.postArticle(payload);
        reset(e);
    }


    return (
        <>
            {props.showModal === 'open' &&
                (<Container>
                    <Content>
                        <Header>
                            <h2>Create a post</h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="./images/close-icon.png" alt="Close Icon" />
                            </button>
                        </Header>
                        <SharedContent>
                            <UserInfo>
                                {props.user.photoURL ? <img src={props.user.photoURL} alt='USER IMAGE' /> : <img src="./images/user.svg" alt="user image" />}
                                {props.user.displayName ? <span>{props.user.displayName}</span> : <span>Name</span>}
                            </UserInfo>
                            <Editor>
                                <textarea
                                    value={editorText}
                                    onChange={(e) => setEditorText(e.target.value)}
                                    placeholder='What do you what to talk about?'
                                    autoFocus={true}
                                >
                                </textarea>
                                {assetArea === 'image' ?
                                    (
                                        <UploadImage>
                                            <input
                                                type="file"
                                                accept='image/gif,image/jpeg,image/png'
                                                name='image'
                                                id='file'
                                                style={{ display: 'none' }}
                                                onChange={handleChange}
                                            />
                                            <p>
                                                <label htmlFor="file">
                                                    Select an image to share
                                                </label>
                                            </p>
                                            {shareImage && <img src={URL.createObjectURL(shareImage)} />}
                                        </UploadImage>
                                    ) : (
                                        assetArea === 'media' && (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder='please input a video link'
                                                    value={videoLink}
                                                    onChange={(e) => setVideoLink(e.target.value)}
                                                />
                                                {videoLink && <ReactPlayer width='100%' url={videoLink} />}

                                            </>)
                                    )
                                }


                            </Editor>
                        </SharedContent>
                        <SharedCreation>

                            <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea('image')}>
                                    <img src="./images/photo-icon.png" alt="share photo" />
                                </AssetButton>
                                <AssetButton onClick={() => switchAssetArea('media')}>
                                    <img src="./images/video-icon.png" alt="share Video" />
                                </AssetButton>
                            </AttachAssets>

                            <ShareComment>
                                <AssetButton>
                                    <img src="./images/share-comment.png" alt="share-comment" />
                                    Anyone
                                </AssetButton>
                            </ShareComment>

                            <PostButton 
                            disabled={!editorText ? true : false} 
                            onClick={(event) => postArticle(event)}

                            >
                                Post
                            </PostButton>
                        </SharedCreation>
                    </Content>
                </Container>)
            }
        </>
    )
}

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:100;
    color:black;
    background-color: rgba(0,0,0,0.8);
    animation:fadeIn 0.3s;
`
const Content = styled.div`
    width:100%;
    max-width:552px;
    background-color: white;
    max-height:90%;
    overflow:initial;
    border-radius:5px;
    position: relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin: 0 auto;
`
const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height: 1.5;
    color:rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        height:43px;
        width: 42.5px;
        color:rgba(0,0,0,0.15);
        position:relative;
        border:none;
        background: transparent;
        cursor:pointer;
        img{
            position:absolute;
            pointer-events:none;
            height:40px;
            width: 40px;
            top:0;
            left:0;
        }
    }

`
const SharedContent = styled.div`
    display:flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align: baseline;
    background: transparent;
    padding:8px 12px;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding:12px 24px;
    img{
        width:48px;
        height:48px;
        background-clip: content-box;
        border:2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight:600;
        font-size:16px;
        line-height: 1.5;
        margin-left: 5px;
    }

`
const SharedCreation = styled.div`
    display:flex;
    justify-content: space-between;
    padding:12px 24px 12px 16px;
`
const AttachAssets = styled.div`
    /* border:2px solid black; */
    display:flex;
    align-items: center;
    flex-direction: row;
    padding-left: 8px;

`

const AssetButton = styled.button`
    display: flex;
    align-items:center;
    height:auto;
    width:auto;
    color:rgba(0,0,0,0.5);
    border:none;
    background: transparent;
    cursor:pointer;
    img{
        height:45px;
        width:45px;
    }
`
const ShareComment = styled.div`
    padding-left: 8px;
    margin-right:auto;
    margin-left:0.5rem;
    border-left : 1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        img{
            margin-right: 5px;
        }
    }
`
const PostButton = styled.button`
    min-width:60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
    color:${(props) => props.disabled ? "rgba(1,1,1,0.2)" : 'white'};
    cursor:pointer;
    transition:all 0.3s ease;
    &:hover{
        background:${(props) => props.disabled ? "rgba(1,1,1,0.08)" : '#004182'};
    }
`
const Editor = styled.div`
    padding:12px 24px;
    textarea{
        width:100%;
        min-height:100px;
        resize: none;
    }
    input{
        width:100%;
        height:35px;
        font-size:16px;
        margin-bottom: 20px;
    }

`
const UploadImage = styled.div`
    text-align:center;
    img{
        width:100%;
    }
    & p {
        margin:1rem 0rem;
        
        label{
            border-radius: 10px;
            font-size:20px;
            /* &:hover{
                background-color: ;
            } */
        }
    } 

`
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}
const mapDispatchToProps = (dispatch) => ({
    postArticle : (payload) => dispatch(postArticleAPI(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

