const mongoose = require('mongoose')
const { Schema, ObjectId} = mongoose

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    risk:{
        type: String,
        enum: ['adversion', 'neutral', 'seeking'],
        required: true
    },
    category: {
        type: String,
        enum: ['']
    }

})