const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, models: {User, Company } } = require('avarus-data')

/**
 *
 * retrieve company by name
 * 
 * @param {query} string
 * @param {userId} objectId of user
 * 
 * @returns {Array} 
 * 
 */

module.exports = function (query, userId) {

    validate.string(query)
    validate.string.notVoid('query', query)

    if (userId) {
        validate.string(userId)
        validate.string.notVoid('userId', userId)
        if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid user id`)
    }

    return (async () => {    

        
        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const companies = await Company.find()

        let companyByName = []

        debugger

        companies.forEach(company => { 

            company.id = company._id.toString();

            delete company._id

            if(company.name.toUpperCase().includes(query.toUpperCase())){
                company.isFav = user.favorites.includes(company.id)
                companyByName.push(company)
            }

            company.save()
        
        })

        if (companyByName.length === 0 ) throw new NotFoundError(`company with query ${query} not found`)

        return companyByName
            
    })()
}