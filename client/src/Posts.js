import { useState, useEffect} from "react"
import Modal from './Modal';
import {apiUrl} from './lib/data'

const Posts = ({posts, postContentValue, handleOnChange, postContent, user, setUser, postsFromFollowing, dispatch}) => {
    
    const [displayModal, setModal] = useState({display: false, content: ""})
    
    useEffect(()=>{
        dispatch({type: "first time", payload: user.posts});
    },[])

    const deletePost = (postID, owner) => {
        const IDs = JSON.stringify({postID, owner});

        fetch(`${apiUrl}/api/posts/delete/${IDs}`, {method: "DELETE"})
        .then(res => res.json())
        .then(result => {
            setModal({display: true, content: result.content});

            setTimeout(() => {
                setModal({display: false, content: ""});
            }, 2000);
            
            setUser({...user, posts: result.newPosts})
        })
        .catch((err) => {
            setModal({display: true, content: "Oops!Could not send request.Try again"})

            setTimeout(() => {
                setModal({display: false, content:""})
            }, 2000);
            
        })
    }

    // Like post

    const likePost = (postID,  ownerID, userID, setLikes) => {

        const IDs = JSON.stringify({postID, ownerID,  userID});

        fetch(`${apiUrl}/api/posts/like-post/${IDs}`, {method: "POST"})
        .then(res => res.json())
        .then(result => {

            setModal({display: true, content: result.message});
            setLikes(result.newPostLikes);

            setTimeout(() => {
                setModal({display: false, content: ""});
            }, 2000);

        })
        .catch(() => {

            setModal({display: true, content: "Could not send request.Try again."});

            setTimeout(() => {
                setModal({display: false, content: ""});
            }, 2000);

        })
    }

    // retweet  posts

    const retweetPost = (postID, ownerID, userID, setRetweets) => {

        const IDs = JSON.stringify({postID, ownerID,  userID});

        fetch(`${apiUrl}/api/posts/retweet-post/${IDs}`, {method: "POST"})
        .then(res => res.json())
        .then(result => {

            setModal({display: true, content: result.message});
            setRetweets(result.newPostRetweets);

            setTimeout(() => {
                setModal({display: false, content: ""});
            }, 2000);

        })
        .catch(() => {

            setModal({display: true, content: "Could not send request.Try again."});

            setTimeout(() => {
                setModal({display: false, content: ""});
            }, 2000);

        })
    }


    return <>
        {displayModal.display && <Modal content={displayModal.content}/>};

        <section className="post-form-container">
            <form className="post-form">
                <textarea name="post"  value={postContentValue} onChange={handleOnChange}></textarea>
                <button type="submit" className="submit-btn"  onClick={postContent}>Post Now</button>
                </form>
        </section>

        <div className="posts-feeds">
                {posts.length > 0 &&
                    posts.map(post => {
                        return <Post key={post._id} post={post} setModal={setModal} displayModal={displayModal} user={user} setUser={setUser} deletePost={deletePost} retweetPost={retweetPost} likePost={likePost}/>
                    })
                }

                {
                   postsFromFollowing.length > 0 && 
                   postsFromFollowing.map(post => {
                        return <PostFollowing key={post._id} post={post} deletePost={deletePost} retweetPost={retweetPost} likePost={likePost} user={user}/>
                   })
                }
        </div>

    </>

}


const Post = ({post, user, retweetPost, likePost, deletePost}) => {

    const {owner, postContent, likes, retweets, postedDate} = post;
    const [postOwner, setOwner] = useState({name: "", handle: ""});
    const [postLikes, setLikes] =  useState(likes);
    const [postRetweets, setRetweets] = useState(retweets)

    useEffect(() => {
        const postOwner = JSON.stringify(owner)
        fetch(`${apiUrl}/api/users/${postOwner}`)
        .then(res => res.json())
        .then(userInfo => setOwner({name: userInfo.name, handle: userInfo.handle}))
        .catch(err => console.log(err))
    }, [])

    return (

            <article className="post">
                
                <div className="post-owner">
                    <div className="profile-div"></div>

                    <div className="identifiers">
                        <a href="/user-name" className="identifiers__name">{postOwner.name}</a>
                        <a href="user-name"  className="identifiers__identifer">@{postOwner.handle}</a>
                    </div>

                    <p className="date">{postedDate}</p>
                </div>

                <p className="post-content">
                    {postContent}
                </p>

                <div className="stats-buttons">
                    <button onClick={() => likePost(post._id, owner, user.id, setLikes)}>Likes {postLikes.length}</button>
                    <button onClick={() => retweetPost(post._id, owner, user.id, setRetweets)}>Retweet {postRetweets.length}</button>
                    <button onClick={() => deletePost(post._id, owner)}>Delete</button>
                </div>
            </article>
            
    )
}

const PostFollowing = ({post, retweetPost, likePost, user}) => {

    const {owner, postContent, likes, retweets, postedDate} = post;
    const [postLikes, setLikes] =  useState(likes);
    const [postRetweets, setRetweets] = useState(retweets)
    const [postOwner, setOwner] = useState({name: "", handle: ""});

    useEffect(() => {
        const postOwner = JSON.stringify(owner)
        fetch(`${apiUrl}/api/users/${postOwner}`)
        .then(res => res.json())
        .then(userInfo => setOwner({name: userInfo.name, handle: userInfo.handle}))
        .catch(err => console.log(err))
    }, [])

    return (

        <article className="post">
            
            <div className="post-owner">
                <div className="profile-div"></div>
                <div className="identifiers">
                    <a href="/user-name" className="identifiers__name">{postOwner.name}</a>
                    <a href="user-name"  className="identifiers__identifer">@{postOwner.handle}</a>
                </div>
                <p className="date">{postedDate}</p>
            </div>

            <p className="post-content">
                {postContent}
            </p>

            <div className="stats-buttons">
                <button onClick={()=> likePost(post._id, owner, user.id, setLikes)}>Likes {postLikes.length}</button>
                <button onClick={()=>retweetPost(post._id, owner, user.id, setRetweets)}>Retweet {postRetweets.length}</button>
            </div>
        </article>
        
    )
    
}

export default Posts