const { model } = require('mongoose')
const { user, wish } = require('./schemas')

module.exports = {
    User: model('User', user),
    Wish: model('Wish', wish),
    Chat: model('Chat', chat),
    Message: model('Message', chat)
}