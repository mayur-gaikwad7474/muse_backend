const mongoose = require('mongoose')
const schema = mongoose.Schema

const Template = new schema({
    user_email: {
        type: String
    },
    design_name: {
        type: String,
        trim: true
    },
    design: {
        type: String
    },
    dimensions: {
        height: {
            type: Number
        },
        width: {
            type: Number
        }
    },
    image_url: {
        type: String
    },
    privacy: {
        type: Boolean
    }
}, { timestamps: true })


module.exports = mongoose.model('Template',Template)
