const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    time: {
        type: Date,
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
    operation: {
        type: String,
        enum: ['buy-in', 'sell-out', 'preset'],
        required: true
    },
    company: {
        type: ObjectId,
        ref: 'Company'
    },
    stock: {
        type: ObjectId,
        ref: 'Stock'
    },
    relatedTo: {
        type: ObjectId,
        ref: 'Transaction'
    }
})