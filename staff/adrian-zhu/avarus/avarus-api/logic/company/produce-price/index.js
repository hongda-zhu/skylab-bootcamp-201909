const { validate, errors: { ContentError, NotFoundError } } = require('avarus-util')
const { ObjectId, models: { Company, Stock } } = require('avarus-data')
const {priceProducer} = require('../../../utils')

module.exports = function () {
    // validate.string(companyId)
    // validate.string.notVoid('companyId', companyId)
    // if (!ObjectId.isValid(companyId)) throw new ContentError(`${companyId} is not a valid companyId`)

    return (async () => { 
  
        const companies = await Company.find()

        await Promise.all(companies.map(async company => {  

            if (!company) throw new NotFoundError(`company with companyId ${companyId} not found`)

            const price = await priceProducer(company)

            const lastAccess = new Date()

            const stock = await Stock.create({price, time: lastAccess})
    
            delete stock.__v
    
            company.stocks.push(stock._doc)
            
        }))

        

    })()
}