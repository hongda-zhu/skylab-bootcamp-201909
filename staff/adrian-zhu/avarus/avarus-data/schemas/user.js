const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const transactionSchema = require('./transaction')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    lastAccess: {
        type: Date
    },

    cash: {
        type: String,
        require: true
    },

    favorites: {
        type: ObjectId,
        ref: 'Company'
    },

    transactions: [transactionSchema]

})