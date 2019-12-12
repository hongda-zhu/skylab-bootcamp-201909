const { errors: { NotFoundError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

/**
 *
 * retrieve companies
 * 
 * @returns {Array} 
 * 
 */

module.exports = function () {

    return (async () => { 

        // const authenticateUser = await User.findById(id)

        // if(!authenticateUser) throw new NotFoundError(`we can't found any user with id ${id}`)

        // if (!Company) throw new NotFoundError(`Module with name ${Company} does not exist`)

        const companies = await Company.find().lean()

        if (!companies) throw new NotFoundError(`${companies} does not exist`)

        companies.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
        })

        return companies
    })()

}