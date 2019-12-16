const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, models: { User, Company } } = require('avarus-data')

/**
 *
 * retrieve companies
 * 
 * @returns {Array} 
 * 
 */

module.exports = function (userId) { 

    let id = userId

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => { 

        const user = await User.findById(id)

        if(!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const companies = await Company.find().lean()

        companies.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
        })

        return companies
    })()

}