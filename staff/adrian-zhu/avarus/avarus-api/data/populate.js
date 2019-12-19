require('dotenv').config()
const moment = require('moment')
const { database, models: { Company, Stock } } = require('avarus-data')
const { env: { DB_URL } } = process;
const fetch = require('node-fetch');

(async () => {
    try {
        await database.connect(DB_URL)

        await Company.deleteMany()

        const campo = new Company({
            name: 'navarro-navarro',
            description: 'The navarro-navarro company',
            risk: 'neutral',
            category: 'sports',
            market: 'neutral',
        })

        await campo.save()

        // moment example

        // const data = (await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo').then(res => res.json()))['Monthly Time Series']

        // for (const key in data) {

        //     const price = Number(data[key]['4. close'])

        //     const time = new Date(key)

        //     const stock = new Stock({ price, time })

        //     campo.stocks.push(stock)

        // }

        await campo.save()
    } catch (error) {
        console.error(error)
    }
})()

// moment example

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

//     campo.stocks.push(stock)

//     console.log(stock.toJSON())
// }