const { errors: { NotFoundError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

module.exports = function () {


    return (async () => {

        if (!Company) throw new NotFoundError(`Module with name ${Company} does not exist`)

        const company = await Company.find({ __v: 0 }).lean()

        company.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
        })

        return company
    })()

}