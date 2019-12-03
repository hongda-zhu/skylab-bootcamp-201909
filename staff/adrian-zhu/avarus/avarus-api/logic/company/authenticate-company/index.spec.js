require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const authenticateCompany = require('.')
const { random, floor} = Math
const { errors: { ContentError, CredentialsError } } = require('avarus-util')
const { database, models: { Company } } = require('avarus-data')

describe('logic - authenticate company', () => {
    
    before(() => database.connect(TEST_DB_URL))

    let risks = ['adversion', 'neutral', 'seeking']
    let markets = ['bear','bull', 'neutral']
    let categories = ['tech', 'food', 'finance', 'sports', 'gaming', 'fashion']

    let name, description, risk, market, category, dependency, stocks, image 
    
    beforeEach(async() => {  
        name = `name-${random()}`
        description = `description-${random()}`
        risk = risks[floor(random() * risks.length)]
        market = markets[floor(random() * markets.length)]
        category = categories[floor(random() * categories.length)]
        
        dependency = `dependency ${random()}`
        image = `image ${random()}`
        stocks = []

        await Company.deleteMany()
        const company = await Company.create({ name, description, risk, market, category, dependency, stocks, image})
        id = company.id

    })

    it('should succeed on correct credentials', async () => {

        debugger
        const companyId = await authenticateCompany(name, risk, category)

        expect(companyId).to.exist
        expect(typeof companyId).to.equal('string')
        expect(companyId.length).to.be.greaterThan(0)

        expect(companyId).to.equal(id)
    })

    

    describe('when wrong credentials', () => { 
        it('should fail on wrong name', async () => {
            const name = 'wrong'

            try {
                await authenticateCompany(name, risk, category)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(CredentialsError)

                const { message } = error
                expect(message).to.equal(`wrong name`)
            }
        })

        it('should fail on wrong risk', async () => {
            const risk = 'wrong'

            try {
                await authenticateCompany(name, risk, category)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(CredentialsError)

                const { message } = error
                expect(message).to.equal(`wrong risk`)
            }
        })

        it('should fail on wrong category', async () => {
            const category = 'wrong'

            try {
                await authenticateCompany(name, risk, category)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(CredentialsError)

                const { message } = error
                expect(message).to.equal(`wrong category`)
            }
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => authenticateCompany(1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateCompany(true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateCompany([])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateCompany({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateCompany(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateCompany(null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateCompany('')).to.throw(ContentError, 'name is empty or blank')
        expect(() => authenticateCompany(' \t\r')).to.throw(ContentError, 'name is empty or blank')

        expect(() => authenticateCompany(name, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateCompany(name, true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateCompany(name, [])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateCompany(name, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateCompany(name, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateCompany(name, null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateCompany(name, '')).to.throw(ContentError, 'risk is empty or blank')
        expect(() => authenticateCompany(name, ' \t\r')).to.throw(ContentError, 'risk is empty or blank')

        expect(() => authenticateCompany(name, risk, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => authenticateCompany(name, risk, true)).to.throw(TypeError, 'true is not a string')
        expect(() => authenticateCompany(name, risk, [])).to.throw(TypeError, ' is not a string')
        expect(() => authenticateCompany(name, risk, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => authenticateCompany(name, risk, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => authenticateCompany(name, risk, null)).to.throw(TypeError, 'null is not a string')

        expect(() => authenticateCompany(name, risk, '')).to.throw(ContentError, 'category is empty or blank')
        expect(() => authenticateCompany(name, risk, ' \t\r')).to.throw(ContentError, 'category is empty or blank')

    })

    after(() => Company.deleteMany().then(database.disconnect))
})