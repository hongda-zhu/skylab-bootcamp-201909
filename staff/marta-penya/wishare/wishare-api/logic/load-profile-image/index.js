require('dotenv').config()
const { validate } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')
const fs = require('fs')
const path = require('path')

/**
* Load the user profile image
* 
* @param {ObjectId} id of the user
*
* @returns {Promise} - data of image  
*/


module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)


    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} not found`)

        let goTo = path.join(__dirname, `../../data/users/${id}/profile.png`)
        return fs.createReadStream(goTo)
          
    })()
}

