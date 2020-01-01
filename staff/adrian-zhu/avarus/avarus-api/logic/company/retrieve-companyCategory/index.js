const { validate, errors: { NotFoundError } } = require('avarus-util')
const { ObjectId, models: { User, Company } } = require('avarus-data')

/**
 *
 * retrieve company by category
 * 
 * @param {category} string enum
 * @param {userId} objectId of user
 * 
 * @returns {Array} 
 * 
 */


module.exports = function (category, userId) {

    validate.string(category)
    validate.string.notVoid('category', category)

    if (userId) {
        validate.string(userId)
        validate.string.notVoid('userId', userId)
        if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid user id`)
    }

    return (async () => {

        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const companies = await Company.find()

        let companyByCategory = []

        if (companies.length === 0) throw new NotFoundError(`there has no company`)

        companies.forEach(company => {

            company.id = company._id.toString();

            delete company._id

            if (company.category.toUpperCase() === category.toUpperCase()) {
                company.isFav = user.favorites.includes(company.id)
                companyByCategory.push(company)
            }

            company.save()

        })

        if (companyByCategory.length === 0) throw new NotFoundError(`company with category ${category} not found`)

        return companyByCategory

    })()
}