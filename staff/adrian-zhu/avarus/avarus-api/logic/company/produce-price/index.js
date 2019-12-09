const { validate, errors: { ContentError, NotFoundError } } = require('avarus-util')
const { ObjectId, models: { Company, Stock } } = require('avarus-data')

const STOCKS_INTERVAL = 1000 //* 60 * 60 // ms

module.exports = function () {
    return (async () => {
        const companies = await Company.find()

        await Promise.all(companies.map(async company => {
            if (!company) throw new NotFoundError(`company with companyId ${companyId} not found`)

            if (!company.stocks.length) {
                const stock = new Stock({ price: 15, time: new Date('2019-12-01') })

                company.stocks.push(stock)
            }

            const lastStock = company.stocks[company.stocks.length - 1]

            let lastTime = lastStock.time.getTime()

            const diff = Date.now() - lastTime

            const gap = Math.floor(diff / STOCKS_INTERVAL)

            let lastPrice = lastStock.price

            for (let i = 0; i < gap; i++) {
                const newPrice = calculatePrice(company.market, lastPrice)

                const newTime = lastTime + STOCKS_INTERVAL

                const newStock = new Stock({ price: newPrice, time: new Date(newTime) })

                company.stocks.push(newStock)

                lastTime = newTime
                lastPrice = newPrice
            }

            await company.save()
        }))
    })()
}

function calculatePrice(market, previousPrice) {
    // TODO switch (market)
    return previousPrice + (previousPrice * (Math.floor(Math.random() * (0.0009 - 0.0004)) + 0.0004))
} 