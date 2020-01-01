const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, models: { User, Company } } = require('avarus-data')

/**
 *
 * retrieve companies
 * 
 * @param {ObjectId} userId => userId 
 * 
 * @return {Promise}
 * @return {Array} the complete information of each company
 *  
 */

module.exports = function (userId) { 

    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async () => { 

        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const companies = await Company.find().lean()

        const results = []

        companies.forEach(company => {

            company.id = company._id.toString()
            delete company._id
            delete company.__v
            
            company.isFav = user.favorites.includes(company.id)

            results.push(company)
        })

        return results
    })()

}