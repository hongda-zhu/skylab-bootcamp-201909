const { validate, errors: { NotFoundError, ContentError } } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')

/**
 * Deletes the indicated wish of the user
 * 
 * @param {ObjectId} id of user
 * @param {ObjectId} wishId wish id
 * 
 * @returns {Promise} 
 */


module.exports = function (id, wishId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new NotFoundError(`user with id ${id} not found`)

    validate.string(wishId)
    validate.string.notVoid('wishId', wishId)
    if (!ObjectId.isValid(wishId)) throw new NotFoundError(`wish with id ${wishId} not found`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const wish = user.wishes.find(wish => wish.id === wishId)
        if (!wish) throw new NotFoundError(`user does not have task with id ${wishId}`)
        debugger

        await User.updateOne(
            { _id: ObjectId(id) },
            { $pull: { wishes: { _id: ObjectId(wishId) } } }
          )

    })()
}