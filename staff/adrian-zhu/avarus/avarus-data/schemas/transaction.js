const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const Sellout = require('./sellout')

module.exports = new Schema({

    company: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    stock: {
        type: ObjectId,
        ref: 'Stock',
        required: true
    },
    operation: {
        type: String,
        enum: ['buy-in', 'sell-out', 'preset'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    relatedTo:[{
        type: ObjectId,
        ref: 'Sellout'
    }]
})