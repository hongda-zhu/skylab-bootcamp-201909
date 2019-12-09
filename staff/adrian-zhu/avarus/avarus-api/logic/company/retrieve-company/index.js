const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, models: { Company } } = require('avarus-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const company = await Company.findById(id)

        if (!company) throw new NotFoundError(`company with id ${id} not found`)

        await company.save()

        const { name, description, risk, market, category, dependency, image, stocks } = company

        return { id, name, description, risk, market, category, dependency, image, stocks }
    })()
}