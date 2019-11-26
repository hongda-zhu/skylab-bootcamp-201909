const mongoose = require('mongoose')
const [Schema] = mongoose

module.exports = new Schema({
    companyID: {
        type: ObjectId,
        ref: 'Company'
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})