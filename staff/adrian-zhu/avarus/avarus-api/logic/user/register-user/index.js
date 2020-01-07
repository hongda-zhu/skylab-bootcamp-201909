const { validate, errors: { ConflictError } } = require('avarus-util')
const { models: { User } } = require('avarus-data')
const bcrypt = require('bcryptjs')

/**
 *
 * register user
 * 
 * @param {email} string
 * @param {username} string 
 * @param {password} string
 * @param {verifiedPassword} string
 * @param {budget} number
 * 
 * @returns {Object} 
 * 
 */



module.exports = function (email, username, password, verifiedPassword, budget) {
    debugger
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.email(email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(verifiedPassword)
    validate.string.notVoid('verifiedPassword', verifiedPassword)

    validate.number(budget)

    return (async () => {
        
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        if (password !== verifiedPassword) throw new ConflictError (`failed to verify, passwords are not the same, please introduce correctly your password and verify password`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({username, email, password: hash, budget })

    })()
}