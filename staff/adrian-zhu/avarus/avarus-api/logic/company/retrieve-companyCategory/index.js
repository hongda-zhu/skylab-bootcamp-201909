const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

/**
 *
 * retrieve company by category
 * 
 * @param {category} string enum
 * 
 * @returns {Array} 
 * 
 */


module.exports = function (category) {
    
    validate.string(category) 
    validate.string.notVoid('category', category)

    return (async () => {    
        const companies = await Company.find()

        let companyByCategory = []

        if (companies.length === 0) throw new NotFoundError(`company with category ${category} not found`)

        companies.forEach(company => {
            
            company.id = company._id.toString();

            delete company._id

            if(company.category.toUpperCase() === category.toUpperCase()) companyByCategory.push(company)
        })

        return companyByCategory
            
    })()
}