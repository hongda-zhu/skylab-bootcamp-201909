const { validate, errors: { ContentError, NotFoundError} } = require('avarus-util')
const { ObjectId, models: { User } } = require('avarus-data')

module.exports = function (id, transactionId) { 

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(transactionId)
    validate.string.notVoid('transactionId', transactionId)
    if (!ObjectId.isValid(transactionId)) throw new ContentError(`${transactionId} is not a valid task id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const transaction = user.transactions.find((transaction => transaction.id == transactionId))

        if (!transaction) throw new NotFoundError(`user does not have transaction with id ${transactionId}`)

        await User.updateOne(
            { _id: ObjectId(id) },
            { $pull: { transactions: { _id: ObjectId(transactionId) } } }
          )

    })()
}