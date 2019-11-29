require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const modufyUser = require('.')
const { errors: { NotFoundError } } = require('avarus-util')
const { database, models: { User } } = require('avarus-data')

describe('logic - modify user', () => {
  before(() => database.connect(TEST_DB_URL))

  let id, name, surname, email, password

  describe('when user is registed correctly', () => {
    beforeEach(async () => {
      name = `name-${random()}`
      surname = `surname-${random()}`
      username = `username-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`

      await User.deleteMany()

      const user = await User.create({ name, surname, username, email, password })
      
      await user.save()

      id = user.id
    })

    it('should succeed on modify name and correct user id', async () => {
      newName = `name-${random()}`
      newSurname = undefined
      newUsername = undefined

      await modufyUser(id, newName, newSurname, newUsername)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(newName)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
    })

    it('should succeed on modify surname and correct user id', async () => {
      newName = undefined
      newSurname = `surname-${random()}`
      newUsername = undefined

      await modufyUser(id, newName, newSurname, newUsername)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(newSurname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
    })

    it('should succeed on modify email and correct user id', async () => {
      newName = undefined
      newSurname = undefined
      newUsername = `email-${random()}@mail.com`

      await modufyUser(id, newName, newSurname, newUsername)
      const user = await User.findById(id)

      expect(user).to.exist
      expect(user.id).to.equal(id)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.username).to.equal(newUsername)
      expect(user.password).to.equal(password)
    })

    it('should fail on wrong user id', async () => {
      const id = '012345678901234567890123'

      try {
        await modufyUser(id)

        throw Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.an.instanceOf(NotFoundError)
        expect(error.message).to.equal(`user with id ${id} not found`)
      }
    })

  })
})