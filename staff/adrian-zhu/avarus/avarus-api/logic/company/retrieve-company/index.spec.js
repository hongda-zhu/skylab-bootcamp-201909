require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveCompany = require('.')
const { errors: { NotFoundError } } = require('avarus-util')
const { database, models: { Company } } = require('avarus-data')

describe('logic - retrieve company', () => {

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

    it('should succeed on correct company id', async () => {
        const company = await retrieveCompany(id)

        expect(company).to.exist
        expect(company.id).to.equal(id)
        expect(company.name).to.equal(name)
        expect(company.description).to.equal(description)
        expect(company.risk).to.equal(risk)
        expect(company.market).to.equal(market)
        expect(company.category).to.equal(category)
        expect(company.dependency).to.eql(dependency)
        expect(company.image).to.equal(image)
        expect(company.stocks).to.eql(stocks)
    })

    it('should fail on wrong company id', async () => {
        const id = '123123123123'

        try {
            await retrieveCompany(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`company with id ${id} not found`)
        }
    })

    after(() => Company.deleteMany().then(database.disconnect))
})