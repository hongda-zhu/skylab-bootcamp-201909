const { validate, errors: { ConflictError } } = require('avarus-util')
const {models: { Company } } = require('avarus-data')

module.exports = function (name, description, risk, market, category, dependency, image, stocks) { 
   
    validate.string(name)
    validate.string.notVoid('name', name)
    
    validate.string(description)
    validate.string.notVoid('description', description)
    
    validate.string.notVoid('risk', risk)
    validate.string(risk)
    
    validate.string(market)
    validate.string.notVoid('market', market)
    
    validate.string(dependency)
    validate.string.notVoid('dependency', dependency)
    
    validate.string.notVoid('image', image)
    validate.string(image)
    
    validate.array(stocks)
    

    return (async () => {

        const company = await Company.findOne({ name })

        if (company) throw new ConflictError(`company with name ${name} already exists`)
 
        await Company.create({ name, description, risk, market, category, dependency, stocks, image})

    })()
}