const { validate, errors: { NotFoundError, ContentError } } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        debugger
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const { name, surname, email, birthday, description } = user.toObject()

        return { id, name, surname, email, birthday, description }
    })()
}