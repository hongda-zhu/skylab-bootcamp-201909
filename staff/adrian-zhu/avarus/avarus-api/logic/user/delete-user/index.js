const { validate, errors: { ContentError} } = require('avarus-util')
const { ObjectId, models: { User } } = require('avarus-data')

module.exports = function (id) { 
    validate.string(id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => { 
        if (!User) throw new ContentError(`${User} is not a valid model`)
        await User.findByIdAndDelete(id)
    })()
}