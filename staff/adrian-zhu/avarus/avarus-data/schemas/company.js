const mongoose = require('mongoose')
const { Schema, ObjectId} = mongoose
const stock = require('./stock')

module.exports = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    risk:{
        type: String,
        enum: ['adversion', 'neutral', 'seeking'],
        required: true
    },
    market:{
        type: String,
        enum: ['bear', 'bull', 'neutral'],
        required: true 
    },
    category: {
        type: String,
        enum: ['tech', 'food', 'finance', 'sports', 'gaming', 'fashion'],
        required: true
    },
    dependency: {
        type: String,
        ref:'Company'
    },
    stocks: [stock],
    versionKey: false 
})