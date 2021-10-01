import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import PostModal from './PostModal'
import { getArticlesAPI } from '../action';
import ReactPlayer from 'react-player';

const Main = (props) => {
    const [showModal, setShowModal] = useState('close');
    console.log('MAIN ARTICLES= ', props.articles.length);

    useEffect(() => {
        props.getArticles();
    }, [])

    const handleClick = (e) => {
        console.log('E', e);
        e.preventDefault();
        console.log(e.target);
        // if (e.target !== e.currentTarget) {
        //     return;
        // }
        switch (showModal) {
            case 'open':
                setShowModal('close')
                break;
            case 'close':
                setShowModal('open')
                break;
            default:
                setShowModal('close');
                break;

        }
        // setShowModal('open');
    }

    return (
        <>
            {props.articles.length === 0 ?
                (<p>There are no Articles</p>) :
                
                    (<Container>
                        <ShareBox>
                            <div>
                                {props.user && props.user.photoURL ?
                                    <img src={props.user.photoURL} alt="user photo" /> :
                                    <img src="./images/user.svg" alt="user image" />}
                                {/* <div> */}
                                {/* <img src="./images/user.svg" alt="user image" /> */}
                                <button
                                    onClick={handleClick}
                                    disabled={props.loading ? true : false}
                                >
                                    Start a post
                                </button>
                            </div>
                            <div>
                                <button>
                                    <img src="./images/photo-icon.png" />
                                    <span>Photo</span>
                                </button>
                                <button>
                                    <img src="./images/video-icon.png" alt="video-icon" />
                                    <span>Video</span>
                                </button>
                                <button>
                                    <img src="./images/event-icon.png" alt="event-icon" />
                                    <span>Event</span>
                                </button>
                                <button>
                                    <img src="./images/article-icon.png" alt="article-icon" />
                                    <span>Write article</span>
                                </button>
                            </div>
                        </ShareBox>
                        <Content>
                            {
                                props.loading && <img src='./images/loading.gif' alt="loading gif" />
                            }
                            {
                                props.articles.length > 0 &&
                                props.articles.map((article, key) => (
                                    <Article key={key}>
                               
                                <SharedActor>
                                    <a>
                                        <img src={article.actor.image} alt="user-icon" />
                                        <div>
                                            <span>{article.actor.title}</span>
                                            <span>{article.actor.description}</span>
                                            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </a>
                                    <button>
                                        <img src="./images/ellipsis-icon.png" alt="ellipsis-icon" />
                                    </button>

                                </SharedActor>
                                <Description>{article.description}</Description>
                                <SharedImg>
                                    <a>
                                        {
                                            !article.sharedImg && article.video ? 
                                            (<ReactPlayer width='100%' url = {article.video}/>) 
                                            : 
                                            (
                                                article.sharedImg && <img src={article.sharedImg} alt="Shared Img" />
                                            )
                                            
                                        }
                                    </a>
                                </SharedImg>
                                <SocialCounts>
                                    <li>
                                        <button>
                                            <img src="./images/like-icon.png" alt="Like-img" />
                                            <img src="./images/clapping-icon.png" alt="following-icon" />
                                            <span>75</span>
                                        </button>
                                    </li>
                                    <li>
                                        <a>
                                            {article.comments}
                                        </a>
                                    </li>
                                </SocialCounts>
                                <SocialActions>
                                    <button>
                                        <img src="./images/like-facebook.png" alt="like-button" />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img src="./images/comments-facebook.png" alt="comments-button" />
                                        <span>Comments</span>
                                    </button>
                                    <button>
                                        <img src="./images/share-facebook.png" alt="share-button" />
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img src="./images/send-facebook.png" alt="send-button" />
                                        <span>Send</span>
                                    </button>
                                </SocialActions>
                            </Article>
                            ))}
                        </Content>
                        <PostModal
                            showModal={showModal}
                            handleClick={handleClick}
                        />
                    </Container>)
                
            }
        </>
    )
}
const Container = styled.div`
            grid-area:main;
            `
const CommonCard = styled.div`
            text-align:center;
            overflow:hidden;
            margin-bottom:8px;
            background-color:#fff;
            border-radius:5px;
            position:relative;
            border:none;
            box-shadow:0 0 0 1px rgb(0 0 0 / 15%),0 0 0 1px rgb(0 0 0 / 20%);
            `
const ShareBox = styled(CommonCard)`
            display:flex;
            flex-direction:column;
            color:#958b7b;
            margin:0 0 8px ;
            background:white;

            div
            {
                button
        {
                img
            {
                height:35px;
                
            }
        }
            button
            {
                outline:none;
            color:rgba(0,0,0,0.6);
            font-size:14px;
            line-height:1.5;
            min-height:48px;
            background:transparent;
            border:none;
            display:flex;
            align-items:center;
            font-weight:600;
            cursor:pointer;

        }

            &:first-child
            {
                display:flex;
            align-items:center;
            padding:8px 16px 0px 16px;

            img
            {
                width:48px;
            border-radius:50%;
            margin-right:8px;

            }
            button
            {
                margin:4px 0px;
            flex-grow:1;
            border-radius: 35px;
            border:1px solid rgba(0,0,0,0.15);
            padding-left:16px;
            background-color:white;
            text-align:left;
            }
        }
            &:nth-child(2)
            {
                display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom:4px;

            button
            {
                img
                {
                margin:0px 4px 0px -2px;
                }
            span
            {
                color: #70b5f9;

                }
            }
        }


    }

            `
const Content = styled.div`
    text-align:center;
    & > img{
        width:30px;
    }

`;

const Article = styled(CommonCard)`
            padding:0;
            margin:0 0 8px;
            overflow:visible;
            `
const SharedActor = styled.div`
            padding-right:40px;
            flex-wrap:nowrap;
            padding:12px 16px 0px;
            margin-bottom:8px;
            align-items:center;
            display:flex;
            justify-content:space-between;
            position:relative;

            a
            {
                display:flex;
            flex-grow:1;
            margin-right:12px;
            overflow:hidden;
            text-decoration:none;

            img
            {
                width:48px;
            height:48px;
            margin-bottom:0.75rem;

        }
        &>div
            {
                display:flex;
            flex-direction: column;
            flex-grow:1;
            flex-basis:0;
            margin-left:8px;
            overflow:hidden;

            span
            {
                text-align:left;

            &:first-child
            {
                font-size:14px;
            font-weight:700;
            color:rgba(0,0,0,1);
                }
            &:nth-child(2)
            {
                font-size:12px;
            color:rgba(0,0,0,0.6);
                }


            }
        }
    }
            button
            {
                position:relative;
            background: transparent;
            border:none;
            outline:none;
            img
            {
                position:absolute;
            height:20px;
            width:20px;
            right:12px;
            top:-30px;
        }
    }
            `
const Description = styled.div`
            padding:0px 16px;
            overflow: hidden;
            color:rgba(0,0,0,0.9);
            font-size:14px;
            text-align: left;


            `
const SharedImg = styled.div`
            margin-top:8px ;
            width:100%;
            display:block;
            position:relative;
            background-color:#f9fafb;

            img
            {
                object-fit:contain;
            width:100%;
            height:100%;

    }
            `
const SocialCounts = styled.ul`
            text-decoration:none;
            line-height:1.3;
            display:flex;
            align-items:center;
            overflow:auto;
            margin:0 16px;
            padding:8px 0px;
            border-bottom:1px solid #e9e5df;
            list-style: none;

            li
            {
                margin-right:5px;
            font-size:12px;


            button
            {
                display:flex;
            align-items:center;
            justify-content: center;
            outline:none;
            border:none;
            background-color:transparent;
            img
            {
                height:25px;
            width:100%;
            margin-right:0.4rem;
            }
          }

      }


            `
const SocialActions = styled.div`
            align-items:center;
            display:flex;
            justify-content: left;
            /* margin:0px; */
            min-height:40px;
            padding:4px 8px;

            button{
                display:inline-flex;
            align-items:center;
            padding:8px;
            color:#0a66c2;
            border:none;
            background-color:#fff;
            height:2rem;

            img{
                height:15px;
        }

            @media(min-width:768px){
                span{
                margin-left:8px;

            }
        }

    }

            `;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);