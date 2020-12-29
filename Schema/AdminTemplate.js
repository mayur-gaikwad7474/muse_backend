const mongoose = require('mongoose')
const schema = mongoose.Schema

const AdminTemplate = new schema({
    user_id: String,
    design_title: {
        type: String,
        trim: true
    },
    design:String,
    description: String,
    tags: [String],
    industry: String,
    category: String,
    type: String,
    apect_ratio: String,
    color: String,
    country: String,
    language: String,
    image_url: String,
    paid: Boolean,
    text_coverage: String,
    count: String,
    dimensions: {
        height: {
            type: Number
        },
        width: {
            type: Number
        }
    },
}, { timestamps: true })

module.exports = mongoose.model('AdminTemplate', AdminTemplate)
