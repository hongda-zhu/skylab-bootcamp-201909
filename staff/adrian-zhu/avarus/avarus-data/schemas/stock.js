const mongoose = require('mongoose')
const {Schema, ObjectId} = mongoose

module.exports = new Schema({
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})