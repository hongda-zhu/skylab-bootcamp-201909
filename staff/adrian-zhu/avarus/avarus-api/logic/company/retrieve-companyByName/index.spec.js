require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveCompanyByName = require('.')
const { errors: { NotFoundError } } = require('avarus-util')
const { database, models: { User, Company } } = require('avarus-data')

describe('logic - retrieve company by name', () => {

    before(() => database.connect(TEST_DB_URL))

   
    let risks = ['adverse', 'neutral', 'seek']
    let markets = ['bear','bull', 'neutral']
    let categories = ['tech', 'food', 'banking', 'sports', 'gaming', 'fashion']

    let name, description, risk, market, category, dependency, image, stocks

    let accountname, surname, username, email, password, budget 

    beforeEach(async() => {  
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        
        accountname = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        budget = 5000
        transactions = []

        const user = await User.create({ name: accountname, surname, username, email, password, budget, transactions})

        await user.save()
        userId = user.id

        
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

        companyId = company.id

    })

    it('should succeed on correct query', async () => { 

        const companiesByName = await retrieveCompanyByName(name, userId)

        companiesByName.forEach(company => {
    
            expect(company).to.exist
            expect(company.id).to.equal(companyId)
            expect(company.name).to.equal(name)
            expect(company.description).to.equal(description)
            expect(company.risk).to.equal(risk)
            expect(company.market).to.equal(market)
            expect(company.category).to.equal(category)
            expect(company.dependency).to.eql(dependency)
            expect(company.image).to.equal(image)
            expect(company.stocks).to.eql(stocks)

        })
    })

    it('should fail on wrong query', async () => {
        const wrongName = '123123123123'

        try {
            debugger
            await retrieveCompanyByName(wrongName, userId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`company with query ${wrongName} not found`)
        }
    })

    it('should fail on wrong user id', async () => {
        const userID = '123123123123'

        try {
            debugger
            await retrieveCompanyByName(name, userID)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userID} does not exist`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Company.deleteMany()])
        
    .then(database.disconnect))
})