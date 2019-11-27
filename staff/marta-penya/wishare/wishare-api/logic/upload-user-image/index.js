require('dotenv').config()
const { validate } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')


/**
* Update user information.
* 
* @param {ObjectId} id
* @param {Stream} image
* 
* @throws {TypeError} - if userId is not a string or buffer is not a buffer.
* @throws {Error} - if any param is empty, user is not found or image could not be uploaded.
*
* @returns {Object} - user.  
*/


module.exports = function (id, image) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)


    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} not found`)

                
        //mirar si hay carpeta creada para cada usuario, crear carpeta en register

        await User.updateOne({ _id: id }, { $set: image })

    })()
}

