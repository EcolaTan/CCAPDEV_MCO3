const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    _id: String,
    community: {type: String, ref: "Community"},
    title: String,
    body: String,
    poster: {type: String, ref: "User"},
    upvotes: Number,
    upvoters: [{type: String, ref: "User"}],
    downvotes: Number,
    downvoters: [{type: String, ref: "User"}],
    comments: Number,
    commenters: [{type: String, ref: "User"}],
    postDate: Date,
    edited: Boolean
}, { versionKey: false })

const Post = mongoose.model('Post', PostSchema, 'Post')
module.exports = Post