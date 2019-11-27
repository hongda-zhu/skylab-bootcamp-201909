require('dotenv').config()
const moment = require('moment')
const { database, models: { Company, Stock, Transaction, User } } = require('avarus-data')
const { env: { TEST_DB_URL } } = process;
const fetch = require('node-fetch');

(async () => {
    try {
        await database.connect(TEST_DB_URL)

        await Company.deleteMany()

        const coca = new Company({
            name: 'Coca-Cola',
            description: 'The Coca-Cola company',
            risk: 'adversion',
            category: 'food'
        })

        await coca.save()

        // const now = moment()

        // const before = moment().subtract(1, 'months')

        // let first = true

        // while (now.diff(before) > 0) {
        //     before.add(first? 0 : 10, 'minutes')

        //     first = false

        //     const stock = new Stock({
        //         price: 10,
        //         time: before.toDate()
        //     })

        //     coca.stocks.push(stock)

        //     console.log(stock.toJSON())
        // }

        const data = (await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo').then(res => res.json()))['Monthly Time Series']

        for (const key in data) {
            const price = Number(data[key]['4. close'])

            const time = new Date(key)

            const stock = new Stock({ price, time })

            coca.stocks.push(stock)
        }

        debugger

        await coca.save()
    } catch (error) {
        console.error(error)
    }
})()


