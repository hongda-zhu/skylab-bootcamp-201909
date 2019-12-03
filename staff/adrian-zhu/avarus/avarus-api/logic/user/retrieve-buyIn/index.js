const { validate, errors: { NotFoundError } } = require('avarus-util')
const { models: { Transaction, Sellout } } = require('avarus-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => { 

        const buyin = await Transaction.findById(id)

        if(!buyin) throw new NotFoundError(`we can't found this buy-in with id ${id}`)

        if (!Transaction) throw new NotFoundError(`Module with name ${Transaction} does not exist`)

        // await Sellout.populate('buyInTransaction')

        debugger

        const transaction = await Transaction.find({ operation: "buy-in" }).populate('relatedTo')
        /* {path: 'Sellout'} */
        transaction.forEach(transaction => {

            transaction.id = transaction._id.toString()
            delete transaction._id
            delete transaction.__v
            
        })

        return transaction
    })()

}