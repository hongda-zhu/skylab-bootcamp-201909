 const { validate, errors: { ContentError, NotFoundError } } = require('avarus-util')
const { ObjectId, models: { Company, Stock } } = require('avarus-data')

module.exports = function (companyId, price) {

    validate.string(companyId)
    validate.string.notVoid('companyId', companyId)
    if (!ObjectId.isValid(companyId)) throw new ContentError(`${companyId} is not a valid companyId`)

    validate.number(price)


    return (async () => {

        debugger

        const company = await Company.findById(companyId)

        if (!company) throw new NotFoundError(`company with companyId ${companyId} not found`)

        let lastAccess = new Date

        const stock = await Stock.create({price, time: lastAccess})

        delete stock.__v

        company.stocks.push(stock)

        company.save()

        return company.stocks
    })()
}