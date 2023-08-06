const mongoose = require('mongoose')

const CommunitySchema = new mongoose.Schema({
    _id: String,
    name: String,
    about: String,
    members: [{type: String, ref: "User"}],
    icon: String,
    rules: [String],
    createdOn: Date
}, { versionKey: false })

const Community = mongoose.model('Community', CommunitySchema, 'Community')
module.exports = Community