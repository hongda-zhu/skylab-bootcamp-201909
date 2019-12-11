const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, models: { User } } = require('avarus-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        
        const usercase = await User.findById(id).populate({path:'transactions', populate: {path:'user company stock'}})

        if (!usercase) throw new NotFoundError(`usercase with id ${id} not found`)

        await usercase.save()

        const { name, surname, username, email, budget, favorites, transactions} = usercase

        return { id, name, surname, username, email, budget, favorites, transactions }
    })()
}