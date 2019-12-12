const call = require('../../utils/call')
const { validate, errors: { ConflictError} } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

/**
* Toggle Favorite
* 
* @param {string} idUser
* 
* @throws {ConflictError} If exist another user with the same username.
* 
* @return {status}  status 201
*/

module.exports = function (id, companyId) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(companyId)
    validate.string.notVoid('companyId', companyId)
    debugger

    return (async () => {
        const res = await call(`${API_URL}/users/favs/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({companyId})
        })

        if (res.status === 200) return 
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}