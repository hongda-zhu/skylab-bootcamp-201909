require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const authenticateUser = require('.')
const { random, floor} = Math
const { errors: { ContentError, CredentialsError } } = require('avarus-util')
const { database, models: { Company } } = require('avarus-data')

describe('logic - authenticate company', () => {

    before(() => database.connect(TEST_DB_URL))

    let risks = ['adversion', 'neutral', 'seeking']
    let markets = ['bear','bull', 'neutral']
    let categories = ['tech', 'food', 'finance', 'sports', 'gaming', 'fashion']

    let name, description, risk, market, category, dependency, stocks, image 
    
    beforeEach(() => {
        name = `name-${random()}`
        description = `description-${random()}`
        risk = risks[floor(random() * risks.length)]
        market = markets[floor(random() * markets.length)]
        category = categories[floor(random() * categories.length)]
        
        dependency = `dependency ${random()}`
        image = `image ${random()}`
        stocks = []

        return Company.deleteMany()
    })

    it('should succeed on correct credentials', async () => {
        const companyId = await authenticateUser(name, risk, category)

        expect(companyId).to.exist
        expect(typeof companyId).to.equal('string')
        expect(companyId.length).to.be.greaterThan(0)
        expect(companyId).to.equal(id)

    })

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

    after(() => Company.deleteMany().then(database.disconnect))
})