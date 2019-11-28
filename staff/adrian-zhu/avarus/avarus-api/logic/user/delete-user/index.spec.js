 
require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const deleteUser = require('.')
const { random } = Math
const { errors: { NotFoundError } } = require('avarus-util')
const { database, models: { User } } = require('avarus-data')
const bcrypt = require('bcryptjs')

describe('logic - delete user', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, password, budget
    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = '`password-${random()}`'
        budget = 5000

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, password: await bcrypt.hash(password, 10), budget })
    
        id = user.id
    })

    it('should succeed on correct data', async () => {
        await deleteUser(id)

        const user = await User.findById(id)

        expect(user).not.to.exist
      
    })


    it('should fail on wrong user id or not existing', async () => {
        const id = '012345678901234567890123'

        try {
            
            await deleteUser(id)

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`${User} is not a valid model`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))
})