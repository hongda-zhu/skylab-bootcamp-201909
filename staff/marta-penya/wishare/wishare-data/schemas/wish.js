const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    buyer: {
        type: ObjectId,
        ref: 'User'
    },
    given: {
        type: Boolean,
        default: false,
        required: true
    },
    blocked: {
        type: Boolean,
        default: false,
        required: true
    } 
})