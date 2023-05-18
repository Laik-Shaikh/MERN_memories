const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type : [String],
        default : [],
    },
    image: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = new mongoose.model('postMessage', postSchema);
module.exports = PostMessage;