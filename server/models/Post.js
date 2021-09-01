const {Schema, model} = require("mongoose");

const postSchema = new Schema({

    owner: {
        type: Object,
        required: true
    },

    likes: {
        type: Object,
        default: []
    },

    comments: {
        type: Object,
        default: []
    },

    retweets: {
        type: Object,
        default: []
    },

    postContent: {
        type: String,
        required: true
    },
    
    postedDate: {
        type: String,
        required: true
    }
    
})

const Post = model('Post', postSchema);
module.exports = Post;