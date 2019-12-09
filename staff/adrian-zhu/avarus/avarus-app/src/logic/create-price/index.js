const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (id, price) {

    

    validate.string(id)
    validate.string.notVoid('id', id)

    validate.number(price)

    return (async () => { debugger

        const res = await call(`${API_URL}/companies/${id}/price`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({price})
        })
        if (res.status === 200) return

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}