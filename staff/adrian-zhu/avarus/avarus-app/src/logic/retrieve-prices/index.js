const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (id) {

    return (async () => { 

        const res = await call(`${API_URL}/companies/${id}/avgprice`, {
            method: 'GET'
        })
        
        if (res.status === 200) { 
            return JSON.parse(res.body)
        
        }

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}