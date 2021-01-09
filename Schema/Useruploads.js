const mongoose = require('mongoose')
const schema = mongoose.Schema

const Userimages = new schema({
    user_id: String,
    url: String,
    height: Number,
    width: Number,
    file_name: String
}, { timestamps: true })

module.exports = mongoose.model('Userimages', Userimages)
