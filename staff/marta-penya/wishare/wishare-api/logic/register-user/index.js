const { validate, errors: { ConflictError } } = require('wishare-util')
const { models: { User } } = require('wishare-data')

/**
 * Allow a user to be registered by completing the formulary fields
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} year
 * @param {string} month
 * @param {string} day
 * @param {string} password
 * @param {string} passwordconfirm
 * 
 * @returns {Promise}
 */

module.exports = function (name, surname, email, year, month, day, password, passwordconfirm) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.number(year)
    validate.number.notVoid('year', year)
    validate.number(month)
    validate.number.notVoid('month', month)
    validate.number(day)
    validate.number.notVoid('day', day)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(passwordconfirm)
    validate.string.notVoid('passwordconfirm', passwordconfirm)

    if(passwordconfirm !== password) throw new ConflictError('password do not matches')



    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new ConflictError(`user with email ${email} already exists`)


        const birthday = new Date(`${year},${month},${day}`)
        debugger

        await User.create({ name, surname, email, birthday, password })
    })()
}