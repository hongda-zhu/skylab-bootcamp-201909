const STOCKS_INTERVAL = 60000 //* 60 * 60 // ms

/**
 *
 * retrieve time-interval
 * 
 * @returns {Array} 
 * 
 */


module.exports = function () {
    return (async () => {

        let arr = []

        const STOCKS_INTERVAL = 60000 //* 60 * 60 // ms

        const initialTime = new Date('2019-12-10 00:00:00').getTime()

        const lastTime = new Date('2019-12-10 24:00:00').getTime()

        const diff = lastTime - initialTime

        let gap = Math.floor(diff/ STOCKS_INTERVAL)

        for (let i = 0; i < gap; i++) {
            let newPrice = calculatePrice(company.market, lastPrice)

            const newTime = lastTime + STOCKS_INTERVAL

            const newStock = new Stock({ price: newPrice, time: new Date(newTime) })

            company.stocks.push(newStock)

            lastTime = newTime

            return arr
        }

        // (async () => {

        //     try {
        //         await producePrice()
        //         const film = await retrieveCompanyDetail(_this.props.id)
        //         let stocksArr = film.stocks
        //         let arr 
                
        //         Promise.all(stocksArr.map(stock => {
        //             arr.push(stock.price)
        //         }))
                
        //         console.log(arr)
                

        //     } catch {

        //     }

        // })()

        

    })()
}