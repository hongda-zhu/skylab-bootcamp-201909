const { validate, errors: {NotFoundError } } = require('avarus-util')
const { ObjectId, models: { User } } = require('avarus-data')

/**
 *
 * edit-user
 * 
 * @param {id} ObjectId
 * @param {name} string
 * @param {surname} string
 * @param {username} string
 * 
 * @returns {ObjectId} 
 * 
 */


module.exports = function(id, name, surname, username) {
  validate.string(id)
  validate.string.notVoid('id', id)
  if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

  if (name) {
    validate.string(name)
    validate.string.notVoid('name', name)
  }

  if (surname) {
    validate.string(surname)
    validate.string.notVoid('surname', surname)
  }

  if (username) {
    validate.string.notVoid('e-mail', username)
    validate.string(username)
  }


  return (async () => {
    const user = await User.findById(id)

    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    const update = {}

    name && (update.name = name)
    surname && (update.surname = surname)
    username && (update.username = username)
    
    update.lastAccess = new Date

    await User.updateOne({ _id: ObjectId(id) }, { $set: update })
  })()
}