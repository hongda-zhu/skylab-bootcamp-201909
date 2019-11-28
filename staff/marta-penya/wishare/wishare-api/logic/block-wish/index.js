const { validate, errors: { NotFoundError } } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')

/**
 * function to modify an existen wish 
 * 
 * @param {string} id of user 
 * @param {String} wishId wish
 * 
 * @returns {Promise}
 * 
 */

module.exports = function ( friendId, wishId, id ) {

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new NotFoundError(`user with id ${id} not found`)


    return (async () => {
        const user = await User.findById(id)        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        
        const wish = user.wishes.find(wish => wish.id === wishId)        
        if (!wish) throw new NotFoundError(`user does not have wish with id ${wishId}`)

        wish.blocked = !wish.blocked
               
        await User.updateOne(
            { _id: ObjectId(id) },
            { $set: { "wishes.$[wish]" : wish} },
            { arrayFilters: [ { "wish._id": ObjectId(wishId)  } ] }
        )

    })()
}