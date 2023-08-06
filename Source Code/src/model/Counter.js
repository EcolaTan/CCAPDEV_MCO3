const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
    _id: String,
    commentIndex: Number,
    postIndex: Number
}, { versionKey: false })

const Counter = mongoose.model('Counter', CounterSchema, 'Index')
module.exports = Counter