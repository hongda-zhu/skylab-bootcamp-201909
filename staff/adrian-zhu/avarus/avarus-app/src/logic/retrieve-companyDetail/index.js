const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 *
 * retrieve sell-out transaction
 * 
 * @param {id} ObjectId
 * 
 * @returns {Object} 
 * 
 */

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {   

        const res = await call(`${API_URL}/companies/company/${id}`, {
            method: 'GET'
        })

        if (res.status === 200) {
            
            return JSON.parse(res.body)
            
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}