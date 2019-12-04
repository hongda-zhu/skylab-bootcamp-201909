// const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
// const authenticateUser = require('.')
// const { random} = Math
// const { errors: { ContentError, CredentialsError } } = require('avarus-util')
// const { database, models: { User } } = require('avarus-data')
// const bcrypt = require('bcryptjs')

// describe('logic - authenticate user', () => {
    
//     beforeAll(() => database.connect(TEST_DB_URL))

//     let name, surname, email, username, password, budget 
//     beforeEach(async () => {
//         name = `name-${random()}`
//         surname = `surname-${random()}`
//         email = `email-${random()}@mail.com`
//         username = `username-${random()}`
//         password = `password-${random()}`
//         budget = 5000


//         await User.deleteMany()
//         const user = await User.create({ name, surname, email, username, password: await bcrypt.hash(password, 10), budget})
//         id = user.id
//     })

//     it('should succeed on correct credentials', async () => {
//         const userId = await authenticateUser(username, password)

//         expect(userId).to.exist
//         expect(typeof userId).to.equal('string')
//         expect(userId.length).to.be.greaterThan(0)

//         expect(userId).to.equal(id)
//     })

    // describe('when wrong credentials', () => {
    //     it('should fail on wrong username', async () => {
    //         const username = 'wrong'

    //         try {
    //             await authenticateUser(username, password)

    //             throw new Error('should not reach this point')
    //         } catch (error) {   
    //             expect(error).to.exist
    //             expect(error).to.be.an.instanceOf(CredentialsError)

    //             const { message } = error
    //             expect(message).to.equal(`wrong username`)
    //         }
    //     })

    //     it('should fail on wrong password', async () => {
    //         const password = 'wrong'

    //         try {
    //             await authenticateUser(username, password)

    //             throw new Error('should not reach this point')
    //         } catch (error) {
    //             expect(error).to.exist
    //             expect(error).to.be.an.instanceOf(CredentialsError)

    //             const { message } = error
    //             expect(message).to.equal(`wrong password`)
    //         }
    //     })
    // })

    // it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
    //     expect(() => authenticateUser(1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => authenticateUser(true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => authenticateUser([])).to.throw(TypeError, ' is not a string')
    //     expect(() => authenticateUser({})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => authenticateUser(undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => authenticateUser(null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => authenticateUser('')).to.throw(ContentError, 'username is empty or blank')
    //     expect(() => authenticateUser(' \t\r')).to.throw(ContentError, 'username is empty or blank')

    //     expect(() => authenticateUser(email, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => authenticateUser(email, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => authenticateUser(email, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => authenticateUser(email, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => authenticateUser(email, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => authenticateUser(email, '')).to.throw(ContentError, 'password is empty or blank')
    //     expect(() => authenticateUser(email, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    // })

    // afterAll(() => User.deleteMany().then(database.disconnect))
// })