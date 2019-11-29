const { ObjectId, models: { User } } = require('wishare-data')
const { validate,  errors: { ContentError, NotFoundError, ConflictError }  } = require('wishare-util')

/**
 * Add a friend to the friend list of the user
 * 
 * @param {string} id of the user
 * @param {Array} friendId of the friend that the user wants to remove 
 * 
 */

module.exports = (id, friendId) => {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(friendId)
    validate.string.notVoid('friendId', friendId)
    if (!ObjectId.isValid(friendId)) throw new ContentError(`${friendId} is not a valid id`)
    
    return ( async() => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const user2 = await User.findById(friendId)
        if (!user2) throw new NotFoundError(`user with id ${friendId} not found`)

        const friend = user.friends.includes(ObjectId(friendId))

        if(friend) throw new ConflictError(`friend with id ${friendId} is already added`)

        user.friends.push(friendId.toString())
        
        await user.save()        
        
    })()
}