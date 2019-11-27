const mongoose = require('mongoose')
const { Schema, ObjectId} = mongoose
const stock = require('./stock')

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
        enum: ['tech', 'food', 'banking', 'sports', 'gaming', 'fashion'],
        required: true
    },
    dependency: {
        type: ObjectId,
        ref:'Company'
    },
    stocks: [stock]
})