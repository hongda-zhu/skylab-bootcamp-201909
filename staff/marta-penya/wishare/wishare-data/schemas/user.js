const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('tasks-util')
const Wish = require('./wish')

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
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    wishes: [Wish],
    friends: [{
        type: ObjectId,
        ref: 'User'
    }],
    savedWishes: [{
        user: {
            type: ObjectId,
            ref: 'User'
        },
        wish: {
            type: ObjectId,
            ref: 'Wish'
        }
    }]   
})