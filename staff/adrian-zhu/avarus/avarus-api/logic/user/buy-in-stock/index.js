const { validate, errors: { ConflictError, NotFoundError } } = require('avarus-util')
const {models: { Company, User, Stock, Transaction } } = require('avarus-data')

module.exports = function (userId, companyId, stockId, operation, quantity) { 

    validate.string(userId)
    validate.string.notVoid('userId', userId)

    validate.string(companyId)
    validate.string.notVoid('companyId', companyId)

    validate.string(stockId)
    validate.string.notVoid('stockId', stockId)

    validate.string(operation)
    validate.string.notVoid('operation', operation)
    validate.matches('operation', operation, 'buy-in', 'sell-out', 'preset')
    
    validate.number(quantity)

    return (async () => {

        if (operation !== 'buy-in') throw new ConflictError(`it should be buy-in operation`)

        const user  = await User.findById( userId )

        if (!user) throw new NotFoundError(`user with id ${userId} does not exists`)

        const company = await Company.findById(companyId)

        if (!company) throw new NotFoundError(`company with id ${companyId} does not exists`)

        const stock = await Stock.findById(stockId,  { '__v': 0 }).lean()

        if (!stock) throw new NotFoundError(`stock with id ${stockId} does not exists`)

        const {price} = stock

        if (!price) throw new NotFoundError(`price is not defined in this stock`)
        
        const amount = quantity * price

        let {budget}  = user

        if(budget < amount) throw new ConflictError(`you have no enough resource to finish this transaction`)

        budget -= amount

        user.budget = budget

        let time = new Date

        const transaction = await Transaction.create({company: companyId, stock: stockId, user: userId, operation, quantity, amount: amount, time: time})

        user.transactions.push(transaction)

        user.save()

        return transaction
    })()
}