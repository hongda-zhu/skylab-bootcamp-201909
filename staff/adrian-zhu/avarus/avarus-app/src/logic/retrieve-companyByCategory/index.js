const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 *
 * retrieve sell-out transaction
 * 
 * @param {category} string enum
 * 
 * @returns {Array} 
 * 
 */


module.exports = function (category) {
    validate.string(category)
    validate.string.notVoid('category', category)

    return (async () => { debugger
        const res = await call(`${API_URL}/companies/category/${category}`, {
            method: 'GET'
        })

        if (res.status === 200) {
            const companies = JSON.parse(res.body)

            return companies
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}