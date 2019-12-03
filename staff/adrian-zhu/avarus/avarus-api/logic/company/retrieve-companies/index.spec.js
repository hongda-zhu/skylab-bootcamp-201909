require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveCompanies = require('.')
const {errors: { NotFoundError, ContentError } } = require('avarus-util')
const {database, models: { Company } } = require('avarus-data')

describe('logic - retrieve companies', () => {
    before(() => database.connect(TEST_DB_URL))

    let risks = ['adversion', 'neutral', 'seeking']
    let markets = ['bear','bull', 'neutral']
    let categories = ['tech', 'food', 'finance', 'sports', 'gaming', 'fashion']

    let name, description, risk, market, category, dependency, image, stocks

    beforeEach(async() => {  
        name = `name-${random()}`
        description = `description-${random()}`
        risk = risks[floor(random() * risks.length)]
        market = markets[floor(random() * markets.length)]
        category = categories[floor(random() * categories.length)]
        
        dependency = [`dependency ${random()}`]
        image = `image ${random()}`
        stocks = []

        await Company.deleteMany()

        const company = await Company.create({ name, description, risk, market, category, dependency, image, stocks})

        await company.save()

        id = company.id

    })

    it('should succeed on correct user id', async () => {

        const companies = await retrieveCompanies(id)

        expect(companies).to.exist
        expect(companies.length).to.be.greaterThan(0)


        companies.forEach(company => {

            debugger

            expect(company.id).to.be.a("string")
            expect(company.name).to.be.a('string')
            expect(company.description).to.be.a("string")
            expect(company.image).to.be.a('string')
            expect(company.risk).to.be.a('string')
            expect(company.market).to.be.a('string')     
            expect(company.category).to.be.a('string')
            expect(company.dependency).to.be.a('array')
            expect(company.stocks).to.be.a('array')
        })
    })


        it('should fail on wrong user id', async () => {

            debugger
            let id = '5de408747f38731d659c75e9'

            try {
                await retrieveCompanies(id)

                throw Error('should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`we can't found this company with id ${id}`)
            }
        })


        it('should fail on incorrect type and content', () => {
            expect(() => retrieveCompanies(1)).to.throw(TypeError, '1 is not a string')
            expect(() => retrieveCompanies(true)).to.throw(TypeError, 'true is not a string')
            expect(() => retrieveCompanies([])).to.throw(TypeError, ' is not a string')
            expect(() => retrieveCompanies({})).to.throw(TypeError, '[object Object] is not a string')
            expect(() => retrieveCompanies(undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => retrieveCompanies(null)).to.throw(TypeError, 'null is not a string')

            expect(() => retrieveCompanies('')).to.throw(ContentError, 'id is empty or blank')
            expect(() => retrieveCompanies(' \t\r')).to.throw(ContentError, 'id is empty or blank')
        })

    after(() => Company.deleteMany().then(database.disconnect))
})