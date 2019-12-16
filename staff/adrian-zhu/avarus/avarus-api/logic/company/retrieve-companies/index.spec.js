require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveCompanies = require('.')
const {errors: { NotFoundError, ContentError } } = require('avarus-util')
const {database, models: { User, Company } } = require('avarus-data')

describe.only('logic - retrieve companies', () => { 
    before(() => database.connect(TEST_DB_URL))

    let userId

    let risks = ['adverse', 'neutral', 'seek']
    let markets = ['bear', 'bull', 'neutral']
    let categories = ['tech', 'food', 'banking', 'sports', 'gaming', 'fashion']

    let accountname, surname, username, email, password, budget 

    let companyname, description, risk, market, category, dependency, stocks, image 
    
        beforeEach(async () => { 

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

            companyname = `name-${random()}`
            description = `description-${random()}`
            risk = risks[floor(random() * risks.length)]
            market = markets[floor(random() * markets.length)]
            category = categories[floor(random() * categories.length)]
            
            dependency = [`dependency ${random()}`]
            image = `image ${random()}`
            stocks = []
  
            const company = await Company.create({name: companyname, description, risk, market, category, dependency, image, stocks})
  
            companyId = company.id
  
            await company.save()
          

    })

    it('should succeed when there has companies', async () => { 
 
        const companies = await retrieveCompanies(userId)

        expect(companies).to.exist
        expect(companies.length).to.be.greaterThan(0)


        companies.forEach(company => {

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


    it('should fail when there has no companies', async () => {

        let userId = '5de408747f38731d659c75e9'

        try {
            await retrieveCompanies(userId)

            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
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

    after(() => Promise.all([User.deleteMany(), Company.deleteMany()]).then(database.disconnect))
})