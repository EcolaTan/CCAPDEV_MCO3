const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    _id: String,
    poster: {type: String, ref: "User"},
    text: String,
    layer: Number,
    upvotes: Number,
    upvoters: [{type: String, ref: "User"}],
    downvotes: Number,
    downvoters: [{type: String, ref: "User"}],
    replies: [{type: String, ref: "Comment"}],
    replyingTo: {type: String, ref: "Comment"},
    parentPostId: {type: String, ref: "Post"}, 
    parentCommunity: {type: String, ref: "Community"},
    postDate: Date,
    edited: Boolean
}, { versionKey: false }, {strictPopulate: false})

const Comment = mongoose.model('Comment', CommentSchema, 'Comment')
module.exports = Comment