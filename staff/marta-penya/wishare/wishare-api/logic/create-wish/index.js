 
const { validate, errors: { NotFoundError } } = require('wishare-util')
const { models: { Wish } } = require('wishare-data')

module.exports = function ( id, name, link, price, description) {

    validate.string(name)
    validate.string.notVoid('name', name)

    validate.string(title)
    validate.string.notVoid('link', link)

    validate.string(price)
    validate.string.notVoid('price', price)

    validate.string(description)
    validate.string.notVoid('description', description)

    return (async () => {
        const user = await User.findById(id)        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const wish = new Wish({ name, link, price, description })
        user.wishes.push(wish)
        user.save()

    })()
}