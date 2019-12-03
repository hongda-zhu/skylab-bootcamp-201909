require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveBuyin = require('.')
const { errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, database, models: { Transaction } } = require('avarus-data')

describe('logic - retrieve transaction', () => {
    before(() => database.connect(TEST_DB_URL))

    let company, stock, user, operation, quantity, amount, time, relatedTo

    
        beforeEach(async () => {
            await Transaction.deleteMany()

            company = `5de4078f7f38731d659c98e6`
            stock = `5de4080f7f38731d659c98e7`
            user = `5de408747f38731d659c98e9`
            operation = `buy-in`
            quantity = 10
            amount = 140
            time = new Date
            relatedTo = []

            const buyin = await Transaction.create({  company, stock, user, operation, quantity, amount, time, relatedTo })

            id = buyin.id
            
            await buyin.save()

        })

        it('should succeed on correct user id', async () => {

            const buyins = await retrieveBuyin(id)

            expect(buyins).to.exist
            expect(buyins.length).to.be.greaterThan(0)


            buyins.forEach(buyin => {

                expect(buyin.id).to.be.a("string")
                expect(buyin.operation).to.be.a('string')
                expect(buyin.company).to.be.a("object")
                expect(buyin.stock).to.be.a('object')
                expect(buyin.user).to.be.a('object')
                expect(buyin.amount).to.be.a('number')     
                expect(buyin.quantity).to.be.a('number')
                expect(buyin.time).to.be.a('date')
                expect(buyin.relatedTo).to.be.a('array')

            })
        })


        it('should fail on wrong user id', async () => {

            debugger
            let id = '5de408747f38731d659c75e9'

            try {
                await retrieveBuyin(id)

                throw Error('should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`we can't found this buy-in with id ${id}`)
            }
        })


        it('should fail on incorrect type and content', () => {
            expect(() => retrieveBuyin(1)).to.throw(TypeError, '1 is not a string')
            expect(() => retrieveBuyin(true)).to.throw(TypeError, 'true is not a string')
            expect(() => retrieveBuyin([])).to.throw(TypeError, ' is not a string')
            expect(() => retrieveBuyin({})).to.throw(TypeError, '[object Object] is not a string')
            expect(() => retrieveBuyin(undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => retrieveBuyin(null)).to.throw(TypeError, 'null is not a string')

            expect(() => retrieveBuyin('')).to.throw(ContentError, 'id is empty or blank')
            expect(() => retrieveBuyin(' \t\r')).to.throw(ContentError, 'id is empty or blank')
        })

    


    after(() => Transaction.deleteMany().then(database.disconnect))
})