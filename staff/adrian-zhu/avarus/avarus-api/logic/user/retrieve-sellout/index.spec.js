require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveSellout = require('.')
const { errors: { NotFoundError, ContentError } } = require('avarus-util')
const { ObjectId, database, models: { Sellout } } = require('avarus-data')

describe('logic - retrieve Sellout', () => {
    before(() => database.connect(TEST_DB_URL))

    let company, stock, buyInTransaction, operation, quantity, amount, time

    
        beforeEach(async () => {
            await Sellout.deleteMany()

            company = `5de4078f7f38731d659c98e6`
            stock = `5de4080f7f38731d659c98e7`
            buyInTransaction = `5de408747f38731d659c98e9`
            operation = `sell-out`
            quantity = 5
            amount = 70
            time = new Date

            const sellout = await Sellout.create({ company, stock, buyInTransaction, operation, quantity, amount, time })

            id = sellout.id
            
            await sellout.save()

        })

        it('should succeed on correct user id', async () => {

            const sellouts = await retrieveSellout(id)

            expect(sellouts).to.exist
            expect(sellouts.length).to.be.greaterThan(0)


            sellouts.forEach(sellout => {

                expect(sellout.id).to.be.a("string")
                expect(sellout.operation).to.be.a('string')
                expect(sellout.company).to.be.a("object")
                expect(sellout.stock).to.be.a('object')
                expect(sellout.buyInTransaction).to.be.a('object')
                expect(sellout.amount).to.be.a('number')     
                expect(sellout.quantity).to.be.a('number')
                expect(sellout.time).to.be.a('date')

            })
        })


        it('should fail on wrong user id', async () => {

            
            let id = '5de408747f38731d659c75e9'

            try {
                await retrieveSellout(id)

                throw Error('should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`we can't found sellout with id ${id}`)
            }
        })


        it('should fail on incorrect type and content', () => {
            expect(() => retrieveSellout(1)).to.throw(TypeError, '1 is not a string')
            expect(() => retrieveSellout(true)).to.throw(TypeError, 'true is not a string')
            expect(() => retrieveSellout([])).to.throw(TypeError, ' is not a string')
            expect(() => retrieveSellout({})).to.throw(TypeError, '[object Object] is not a string')
            expect(() => retrieveSellout(undefined)).to.throw(TypeError, 'undefined is not a string')
            expect(() => retrieveSellout(null)).to.throw(TypeError, 'null is not a string')

            expect(() => retrieveSellout('')).to.throw(ContentError, 'id is empty or blank')
            expect(() => retrieveSellout(' \t\r')).to.throw(ContentError, 'id is empty or blank')
        })

    after(() => Sellout.deleteMany().then(database.disconnect))
})