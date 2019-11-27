const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const transaction = require('./transaction')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    password: {
        type: String,
        required: true
    },

    budget: {
        type: Number,
        require: true
    },

    favorites: [{
        type: ObjectId,
        ref: 'Company'
    }],

    transactions: [transaction]

})