import call from '../../utils/call'
const { validate, errors: { CredentialsError, NotFoundError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 *
 * edit-user
 * 
 * @param {name} string
 * @param {surname} string
 * @param {email} string
 * 
 */


export default  function (name, surname, email) {
    validate.string(name)
    validate.string.notVoid('name', name)

    validate.string(surname)
    validate.string.notVoid('surname', surname)

    validate.string(email)
    validate.string.notVoid('e-mail', email)

    return (async () => {
        const res = await call(`${API_URL}/users/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name, surname, email })
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}