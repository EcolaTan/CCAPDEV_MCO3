const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    password: String,
    about: String,
    icon: String,
    joinDate: Date
}, { versionKey: false })

const User = mongoose.model('User', UserSchema, 'User')
module.exports = User