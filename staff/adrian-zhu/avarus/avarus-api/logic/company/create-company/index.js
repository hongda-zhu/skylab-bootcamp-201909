const { validate, errors: { ConflictError } } = require('avarus-util')
const {models: { Company } } = require('avarus-data')

module.exports = function (name, description, image, risk, market, category, dependency ,stocks ) {

    validate.string(name)
    validate.string.notVoid('name', name)

    validate.string(description)
    validate.string.notVoid('description', description)

    validate.string(image)
    validate.string.notVoid('image', image)

    validate.string(risk)
    validate.string.notVoid('risk', risk)

    validate.string(market)
    validate.string.notVoid('market', market)

    validate.string(category)
    validate.string.notVoid('category', category)

    validate.string(dependency)
    validate.string.notVoid('dependency', dependency)

    validate.array(stocks)

    return (async () => {

        const company = await company.findOne({ name })

        if (company) throw new ConflictError(`company with name ${name} already exists`)
 
        company = await Company.create({ name, description, image, risk, market, category, dependency, stocks})

        return company.id

    })()
}