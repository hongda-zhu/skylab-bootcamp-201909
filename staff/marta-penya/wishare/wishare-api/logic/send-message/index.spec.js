require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const sendMessage = require('.')
const { errors: { NotFoundError, ContentError } } = require('wishare-util')
const { ObjectId, database, models: { User, Chat } } = require('wishare-data')
const bcrypt = require('bcryptjs')

describe('logic - sendMessage', () => {
    before(() => database.connect(TEST_DB_URL))

    let text, id, name, surname, email, year, month, day, birthday, password, name1, surname1, email1, year1, month1, day1, birthday1, friend2Id, friendId, chatId, message1Id, message2Id, users

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        year = '1999'
        month = '1'
        day = '25'
        passwordconfirm = password
        birthday = new Date(year, month - 1, day, 2, 0, 0, 0)

        name1 = `name-${random()}`
        surname1 = `surname-${random()}`
        email1 = `email-${random()}@mail.com`
        username1 = `username-${random()}`
        password1 = `password-${random()}`
        year1 = '1999'
        month1 = '1'
        day1 = '25'
        passwordconfirm1 = password
        birthday1 = new Date(year1, month1 - 1, day1, 2, 0, 0, 0)

        email2 = `email-${random()}@mail.com`
        birthday2 = new Date(1990, 11, 2, 2, 0, 0, 0)

        title = `title-${random()}`
        link = `link-${random()}`
        price = `price-${random()}@mail.com`
        description = `description-${random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, birthday, password: await bcrypt.hash(password, 10) })
        const friend = await User.create({ name: name1, surname: surname1, email: email1, birthday: birthday1, password: await bcrypt.hash(password, 10) })
        const friend2 = await User.create({ name: name1, surname: surname1, email: email2, birthday: birthday2, password: await bcrypt.hash(password, 10) })

        id = user.id

        friendId = friend.id
        friend2Id = friend2.id

        users = [friendId, friend2Id]

        user.friends.push(friendId.toString())
        user.friends.push(friend2Id.toString())

        await user.save()

        const chat = await Chat.create({ owner: id, users: [friendId, friend2Id]})

        chatId = chat.id

        await chat.save()

        text = "hey! what's up?"
    })

    it('should return a correct chat', async() => {
        const messageId = await sendMessage(chatId, friendId, text)

        const chat = await Chat.findById(chatId)

        chat.message.forEach(element => {
            if (element.id === messageId) {
                expect(element).to.exist
                expect(element.id).to.equal(messageId)
                expect(element.user.toString()).to.equal(friendId)
                expect(element.text).to.equal("hey! what's up?")
                expect(element.date).to.instanceOf(Date)
            }
        })
    })

    it('should throw an NotFoundError because chat doesnt exist', async() => {
        const fakeId = ObjectId().toString()
        try {
            await sendMessage(fakeId, friendId, text)

            throw Error('should not reach this point')
        } catch (error) {

            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`chat with id ${fakeId} not found`)
        }
    })


    it('should throw an NotFoundError because user doesnt exist', async() => {
        const fakeId = ObjectId().toString()
        try {
            await sendMessage(chatId, fakeId, text)

            throw Error('should not reach this point')
        } catch (error) {

            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${fakeId} not found`)
        }
    })


    it('should fail on incorrect chatId, id or text', () => {
        const wrongId = 'wrong id'

        expect(() => sendMessage(1)).to.throw(TypeError, '1 is not a string')
        expect(() => sendMessage(true)).to.throw(TypeError, 'true is not a string')
        expect(() => sendMessage([])).to.throw(TypeError, ' is not a string')
        expect(() => sendMessage({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => sendMessage(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => sendMessage(null)).to.throw(TypeError, 'null is not a string')

        expect(() => sendMessage('')).to.throw(ContentError, 'chatId is empty or blank')
        expect(() => sendMessage(' \t\r')).to.throw(ContentError, 'chatId is empty or blank')
        expect(() => sendMessage(wrongId)).to.throw(ContentError,  `${wrongId} is not a valid id`)

        expect(() => sendMessage(chatId, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => sendMessage(chatId, true)).to.throw(TypeError, 'true is not a string')
        expect(() => sendMessage(chatId, [])).to.throw(TypeError, ' is not a string')
        expect(() => sendMessage(chatId, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => sendMessage(chatId, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => sendMessage(chatId, null)).to.throw(TypeError, 'null is not a string')

        expect(() => sendMessage(chatId, '')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => sendMessage(chatId, ' \t\r')).to.throw(ContentError, 'userId is empty or blank')
        expect(() => sendMessage(chatId, wrongId)).to.throw(ContentError,  `${wrongId} is not a valid id`)

        expect(() => sendMessage(chatId, id, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => sendMessage(chatId, id, true)).to.throw(TypeError, 'true is not a string')
        expect(() => sendMessage(chatId, id, [])).to.throw(TypeError, ' is not a string')
        expect(() => sendMessage(chatId, id, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => sendMessage(chatId, id, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => sendMessage(chatId, id, null)).to.throw(TypeError, 'null is not a string')

        expect(() => sendMessage(chatId, id, '')).to.throw(ContentError, 'text is empty or blank')
        expect(() => sendMessage(chatId, id, ' \t\r')).to.throw(ContentError, 'text is empty or blank')

    })

    after(() => Promise.all([User.deleteMany(), Chat.deleteMany()]).then(database.disconnect))

})