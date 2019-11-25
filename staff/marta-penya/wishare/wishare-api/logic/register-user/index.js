const { validate, errors: { ConflictError } } = require('wishare-util')
const { models: { User } } = require('wishare-data')

/**
 * Allow a user to be registered.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {date} birthday
 * @param {string} password
 * @param {string} passwordconfirm
 * 
 * @returns {Promise}
 */

module.exports = function (name, surname, email, birthday, password, passwordconfirm) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(birthday)
    validate.string.notVoid('birthday', birthday)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(passwordconfirm)
    validate.string.notVoid('passwordconfirm', passwordconfirm)

    if(passwordconfirm !== password) throw new ConflictError('password do not matches')


    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ name, surname, email, birthday, password })
    })()
}