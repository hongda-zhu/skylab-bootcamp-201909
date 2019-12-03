const { validate, errors: { NotFoundError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {

        const authenticateCompany = await Company.findById(id)

        if(!authenticateCompany) throw new NotFoundError(`we can't found this company with id ${id}`)

        if (!Company) throw new NotFoundError(`Module with name ${Company} does not exist`)

        const company = await Company.find().lean()

        company.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
        })

        return company
    })()

}