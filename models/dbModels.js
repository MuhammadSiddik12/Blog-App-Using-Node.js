const db = require('../dbConnect/db')
const mongoose = require('mongoose');
const Signup = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const blog_ = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})


const likeDislike = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    like: {
        type: Boolean,
        required: true
    },
    dislike: {
        type: Boolean,
        required: true
    }
})
const like = mongoose.model('likeDislike', likeDislike)
const user = mongoose.model('user_data', Signup)
const blog = mongoose.model('blog_data', blog_)

module.exports = { user, blog, like }
