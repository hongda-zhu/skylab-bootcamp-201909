const { validate, errors: { CredentialsError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

/**
 *
 * authenticate-company
 * 
 * @param {name} string
 * @param {risk} string enum
 * @param {category} string enum
 * 
 * @returns {company.id} ObjectId
 */

module.exports = function (name, risk, category) {

    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(risk)
    validate.string.notVoid('risk', risk)
    validate.string(category)
    validate.string.notVoid('category', category)

    return (async () => {

        const company = await Company.findOne({ name })

        if (!company) throw new CredentialsError('wrong name')

        if (!(company.risk === risk)) throw new CredentialsError (`wrong risk`)

        if (!(company.category === category)) throw new CredentialsError(`wrong category`)

        return company.id
    })()
}