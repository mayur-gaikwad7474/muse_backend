const mongoose = require('mongoose')
const schema = mongoose.Schema

const Svg = new schema({
    category: String,
    tags: [String],
    url: String
}, { timestamps: true })


module.exports = mongoose.model('Svg', Svg)
