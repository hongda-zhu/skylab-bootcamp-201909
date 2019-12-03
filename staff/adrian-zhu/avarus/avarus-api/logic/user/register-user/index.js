const { validate, errors: { ConflictError } } = require('avarus-util')
const { models: { User } } = require('avarus-data')
const bcrypt = require('bcryptjs')


module.exports = function (name, surname, email, username, password, budget) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.number(budget)

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, username, password: hash, budget })
    })()
}