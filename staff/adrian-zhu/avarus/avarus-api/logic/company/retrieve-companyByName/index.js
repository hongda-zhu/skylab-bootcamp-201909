const { validate, errors: { NotFoundError, ContentError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

/**
 *
 * retrieve company by name
 * 
 * @param {query} string
 * 
 * @returns {Array} 
 * 
 */

module.exports = function (query) {
    
    validate.string(query)
    validate.string.notVoid('query', query)

    return (async () => {    

        
        const companies = await Company.find()

        let companyByName

        if (companies.length === 0) throw new NotFoundError(`company with query ${query} not found`)

        companies.forEach(company => {

            company.id = company._id.toString();

            delete company._id

            if(company.name.toUpperCase() === query.toUpperCase()) companyByName = company
            
        })

        return companyByName
            
    })()
}