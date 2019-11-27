const mongoose = require('mongoose')
const {Schema, ObjectId} = mongoose

module.exports = new Schema({
    transactionTime:{
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    operation: {
        type: String,
        enum:['Buyin', 'Sellout', 'Preset'],
        required: true
    },
    companyId: {
        type: ObjectId,
        ref:'Company'
    },
    stocks:{
        type: ObjectId,
        ref:'Stock'
    },
    relatedTransaction:{
        type: ObjectId,
        ref:'Transaction'
    }
})