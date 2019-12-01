const { ObjectId, models: { Chat, User, Message } } = require('wishare-data')
const { validate, errors: { ContentError, NotFoundError } } = require('wishare-util')


module.exports = function(chatId, userId, text) {
    validate.string(chatId)
    validate.string.notVoid('chatId', chatId)
    if (!ObjectId.isValid(chatId)) throw new ContentError(`${chatId} is not a valid id`)

    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(text)
    validate.string.notVoid('text', text)

    return (async() => {

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const chat = await Chat.findById(chatId)
        if (!chat) throw new NotFoundError(`chat with id ${chatId} not found`)

        const newMessage = new Message({ user: userId, text, date: new Date })
        chat.message.push(newMessage)
        await chat.save()

        return newMessage.id
    })()
}