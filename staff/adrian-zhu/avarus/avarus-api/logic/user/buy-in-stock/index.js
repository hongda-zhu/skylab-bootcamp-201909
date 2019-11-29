const { validate, errors: { ConflictError } } = require('avarus-util')
const {models: { Company, User, Stock, Transaction } } = require('avarus-data')

module.exports = function (userId, companyId, stockId, operation, quantity,) { 

    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid userId`)
    
    validate.string(companyId)
    validate.string.notVoid('companyId', companyId)
    if (!ObjectId.isValid(companyId)) throw new ContentError(`${companyId} is not a valid companyId`)

    validate.string(stockId)
    validate.string.notVoid('stockId', stockId)
    if (!ObjectId.isValid(stockId)) throw new ContentError(`${stockId} is not a valid stockId`)

    validate.string(operation)
    validate.string.notVoid('operation', operation)
    validate.matches('operation', operation, 'buy-in', 'sell-out', 'preset')
    
    validate.number(quantity)

    return (async () => {

        const user  = await User.findById({ userId })

        if (!user) throw new ConflictError(`user with id ${userId} does not exists`)
 
        const company = await Company.findById({ companyId })

        if (!company) throw new ConflictError(`company with id ${companyId}`)

        const stock = await Stock.findById({stockId})

        if (!stock) throw new ConflictError(`stock with id ${stockId}`)

    })()
}