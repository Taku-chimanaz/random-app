const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema({

    fullname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    followers: {
        type: Object,
        default: []
    },

    following: {
        type: Object,
        default: []
    },

    posts: {
        type: Object,
        default: []
    },

    bio: {
        type: String,
        default: ""
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;