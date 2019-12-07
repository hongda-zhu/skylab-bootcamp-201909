const { validate, errors: { NotFoundError } } = require('avarus-util')
const { models: { User, Company } } = require('avarus-data')

module.exports = function () {

    // id
    // validate.string(id)
    // validate.string.notVoid('id', id)

    return (async () => { 

        // const authenticateUser = await User.findById(id)

        // if(!authenticateUser) throw new NotFoundError(`we can't found any user with id ${id}`)

        // if (!Company) throw new NotFoundError(`Module with name ${Company} does not exist`)

        const companies = await Company.find().lean()

        companies.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
        })

        return companies
    })()

}