require('dotenv').config()
const { env: { TEST_DB_URL} } = process
const { expect } = require('chai')
const createCompany = require('.')
const { random, floor } = Math
const { errors: { ContentError } } = require('avarus-util')
const { database, models: { Company } } = require('avarus-data')

describe.only('logic - create company', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, description, risk, market, category, dependency, stocks, image 

    risk = ['adversion', 'neutral', 'seeking']
    let riskIndex = floor(random () *3)

    market = ['bear','bull', 'neutral']
    let marketIndex = floor(random() *3)

    category = ['tech', 'food', 'finance', 'sports', 'gaming', 'fashion']
    let categoryIndex = floor(random() * 6)
    
    beforeEach(() => {
        name = `name-${random()}`
        description = `description-${random()}`
        risk = risk[riskIndex]
        market = market[marketIndex]
        category = category[categoryIndex]

        return Company.deleteMany()
    })

    it('should succeed on correct credentials', async () => {
        const result = await createCompany(name, description, risk, market, category)
        expect(result).not.to.exist

        const company = await Company.findOne({ name })
        expect(company).to.exist
        expect(company.name).to.equal(name)
        expect(company.description).to.equal(description)
        expect(company.risk).to.equal(risk)
        expect(company.market).to.equal(market)
        expect(company.category).to.equal(category)

      
    })

    // describe('when company already exists', async () => {

    //     await Company.create({ name, surname, email, username, password, budget })

    //     it('should fail on already existing company', async () => {
    //         try {
    //             await createCompany(name, surname, email, username, password, budget)

    //             throw Error('should not reach this point')
    //         } catch (error) {
    //             expect(error).to.exist

    //             expect(error.message).to.exist
    //             expect(typeof error.message).to.equal('string')
    //             expect(error.message.length).to.be.greaterThan(0)
    //             expect(error.message).to.equal(`company with username ${username} already exists`)
    //         }
    //     })
    // })

    // it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
    //     expect(() => createCompany(1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => createCompany(true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => createCompany([])).to.throw(TypeError, ' is not a string')
    //     expect(() => createCompany({})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => createCompany(undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => createCompany(null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => createCompany('')).to.throw(ContentError, 'name is empty or blank')
    //     expect(() => createCompany(' \t\r')).to.throw(ContentError, 'name is empty or blank')

    //     expect(() => createCompany(name, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => createCompany(name, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => createCompany(name, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => createCompany(name, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => createCompany(name, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => createCompany(name, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => createCompany(name, '')).to.throw(ContentError, 'surname is empty or blank')
    //     expect(() => createCompany(name, ' \t\r')).to.throw(ContentError, 'surname is empty or blank')

    //     expect(() => createCompany(name, surname, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => createCompany(name, surname, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => createCompany(name, surname, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => createCompany(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => createCompany(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => createCompany(name, surname, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => createCompany(name, surname, '')).to.throw(ContentError, 'e-mail is empty or blank')
    //     expect(() => createCompany(name, surname, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

    //     expect(() => createCompany(name, surname, email, 1)).to.throw(TypeError, '1 is not a string')
    //     expect(() => createCompany(name, surname, email, true)).to.throw(TypeError, 'true is not a string')
    //     expect(() => createCompany(name, surname, email, [])).to.throw(TypeError, ' is not a string')
    //     expect(() => createCompany(name, surname, email, {})).to.throw(TypeError, '[object Object] is not a string')
    //     expect(() => createCompany(name, surname, email, undefined)).to.throw(TypeError, 'undefined is not a string')
    //     expect(() => createCompany(name, surname, email, null)).to.throw(TypeError, 'null is not a string')

    //     expect(() => createCompany(name, surname, email, '')).to.throw(ContentError, 'username is empty or blank')
    //     expect(() => createCompany(name, surname, email, ' \t\r')).to.throw(ContentError, 'username is empty or blank')

    //     expect(() => createCompany(name, surname, email, username, '')).to.throw(ContentError, 'password is empty or blank')
    //     expect(() => createCompany(name, surname, email, username, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
    // })

    after(() => Company.deleteMany().then(database.disconnect))
})