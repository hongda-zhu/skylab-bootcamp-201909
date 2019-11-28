const { validate, errors: { CredentialsError } } = require('avarus-util')
const { models: { User } } = require('avarus-data')
const bcrypt = require('bcryptjs')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })
        if (!user) throw new CredentialsError('wrong username')

        const match = await bcrypt.compare(password, user.password)
        if(!match) throw new CredentialsError ('wrong password')

        return user.id
    })()
}