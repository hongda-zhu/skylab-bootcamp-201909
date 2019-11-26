const { validate, errors: { CredentialsError } } = require('wishare-util')
const { models: { User } } = require('wishare-data')

/**
 * Authenticates a user by her/his email and password.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */

module.exports = function (email, password) {
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ email, password })

        if (!user) throw new CredentialsError('wrong credentials')

        return user.id
    })()
}