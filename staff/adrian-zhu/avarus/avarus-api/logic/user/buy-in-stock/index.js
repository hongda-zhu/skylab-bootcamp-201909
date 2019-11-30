const { validate, errors: { ConflictError } } = require('avarus-util')
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

        const user  = await User.findById( userId,  { '__v': 0 } ).lean()

        if (!user) throw new ConflictError(`user with id ${userId} does not exists`)
 
        const company = await Company.findById(companyId,  { '__v': 0 } ).lean()

        if (!company) throw new ConflictError(`company with id ${companyId}`)

        const stock = await Stock.findById(stockId,  { '__v': 0 }).lean()

        if (!stock) throw new ConflictError(`stock with id ${stockId}`)

        const {price} = stock

        if (!price) throw new ConflictError(`price is not defined in this stock`)
        
        const amount = quantity * price


    })()
}