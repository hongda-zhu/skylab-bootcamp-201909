require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError } } = require('avarus-util')
const { database, models: { User } } = require('avarus-data')
const bcrypt = require('bcryptjs')

describe('logic - retrieve user', () => {
    before(() => database.connect(TEST_DB_URL))

    let email, username, password, verifiedPassword, budget, id


    beforeEach(async () => {
        
        await User.deleteMany()

        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = verifiedPassword = `password-${random()}`
        budget = 5000
        transactions = []
  
        const user = await User.create({  email, username, password: await bcrypt.hash(password, 10), verifiedPassword, budget, transactions})
        id = user.id
    })

    it('should succeed on correct user id', async () => {
        const user = await retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).to.not.exist
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
    })

    it('should fail on wrong user id', async () => {
        const id = '123123123123'

        try {
            await retrieveUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`usercase with id ${id} not found`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))
})