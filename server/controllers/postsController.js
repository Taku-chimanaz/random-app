const Post = require("../models/Post");
const User = require("../models/User");

const submitPost = (req, res) => {

    const postDetails = JSON.parse(req.params.id);

    // creating a new Post

    new Post({
        owner: postDetails.owner,
        postContent: postDetails.postContentValue,
        postedDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`
    }).save()
    .then(async (result) =>{

        // Finding the owner of the post in db

        const user = await User.findById(result.owner, (err, user) =>{
            if(err){
                return null;
            }else {
                return user;
            }
        });
        
        // Updating the user's posts array in db

        User.findByIdAndUpdate(result.owner, {posts: [...user.posts, result]})
        .then(() => res.json(result))
        .catch(err => console.log(err))
       
    })
    .catch(err => console.log("Error:" + err))

}

const deletePost = (req, res) => {

    const IDs = JSON.parse(req.params.id);
    const {postID, owner} = IDs;
    
    Post.findByIdAndDelete(postID)
    .then(() => {

        User.findById(owner)
        .then(user => {

            const posts = user.posts;
            const newPosts = posts.filter(post => post._id != postID);

            User.findByIdAndUpdate(owner, {posts: [...newPosts]})
            .then(() => res.json({newPosts, content: "Post successfully deleted."}))
            .catch(() => res.json("Post could not be deleted."))
        })
    })
}

const likePost = (req, res)=> {

    const IDs = JSON.parse(req.params.id);
    const {postID, ownerID, userID} = IDs;


    Post.findById(postID)
    .then(post => {

        const currentPostLikes = post.likes;
        const alreadyLiked = currentPostLikes.some(id => id == userID)
        let newPostLikes;

        if(alreadyLiked){
            newPostLikes = currentPostLikes.filter(id => id != userID);
        }else {
            newPostLikes = [...currentPostLikes, userID];
        }

        Post.findByIdAndUpdate(postID, {likes: [...newPostLikes]})
        .then(() => {

            User.findById(ownerID)
            .then(async user => {

                const updatedPost = await Post.findById(postID);
                const posts = user.posts;
                const updatedPosts = posts.filter(post => post._id != postID);
                updatedPosts.push(updatedPost);
                
                User.findByIdAndUpdate(ownerID, {posts: updatedPosts})
                .then(() => {
                    
                    if(alreadyLiked){
                        res.json({newPostLikes, message: "Unliked Post"});
                    }else {
                        res.json({newPostLikes, message: "Liked Post"});
                    }
                })
                .catch(err => res.json(err))

            })
        })
    })



}


const retweetPost = (req, res)=> {

    const IDs = JSON.parse(req.params.id);
    const {postID, ownerID, userID} = IDs;


    Post.findById(postID)
    .then(post => {

        const currentPostRetweets = post.retweets;
        console.log("Post retweets: " + currentPostRetweets)
        const alreadyRetweeted = currentPostRetweets.some(id => id == userID)
        console.log("Already Retweeted: " + alreadyRetweeted)
        let newPostRetweets;

        if(alreadyRetweeted){
            newPostRetweets = currentPostRetweets.filter(id => id != userID);
        }else {
            newPostRetweets= [...currentPostRetweets, userID];
        }

        console.log("New post retweets: " + newPostRetweets)

        Post.findByIdAndUpdate(postID, {retweets: [...newPostRetweets]}, {useFindAndModify: false})
        .then(() => {
            User.findById(ownerID)
            .then(async user => {

                const updatedPost = await Post.findById(postID);
                const posts = user.posts;
                const updatedPosts = posts.filter(post => post._id != postID);
                updatedPosts.push(updatedPost);
                
                User.findByIdAndUpdate(ownerID, {posts: updatedPosts})
                .then(() => {
                    
                    if(alreadyRetweeted){
                        res.json({newPostRetweets, message: "Removed Retweet"});
                    }else {
                        res.json({newPostRetweets, message: "Post Retweeted"});
                    }
                })
                .catch(err => console.log(err))

            })
        })
    })



}

const followingPosts = (req, res) => {

    const userFollowingIDs = JSON.parse(req.params.id);

    Post.find()
    .then(posts => {

        const allPosts = posts;
        const postFollowings = [];

        userFollowingIDs.forEach(id => {

            allPosts.forEach(post => {

                if(post.owner == id){
                    postFollowings.push(post)
                }else {
                    return;
                }
            })
        })

        res.json(postFollowings)

    })
    .catch(err => res.json("Could not fetch some posts"))

}


module.exports = {
    submitPost,
    deletePost,
    likePost,
    retweetPost,
    followingPosts
}