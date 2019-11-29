const { validate, errors: { CredentialsError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

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

        if (company.risk === !risk) throw new CredentialsError (`${company.risk} is not equivalent with ${risk}`)

        if (company.category === !category) throw new CredentialsError(`${company.category} is not equivalent with ${category}`)

        return company.id
    })()
}