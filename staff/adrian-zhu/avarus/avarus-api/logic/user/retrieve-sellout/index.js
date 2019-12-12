const { validate, errors: { NotFoundError } } = require('avarus-util')
const { models: { Transaction, Sellout } } = require('avarus-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => { 

        const sale = await Sellout.findById( id ).populate('user company ')
        
        const {_id, company, stock, user, operation, quantity, amount, time} = sale   

        if(!sale) throw new NotFoundError(`we can't found this transactions with id ${id}`)

        let stockId = stock.toString()
        
        const stocked = company.stocks.filter(stocke => {
            if(stocke.id === stockId) return stock
       })
       
       const stockSelected = stocked[0]
        
        return {_id, company, stockSelected, user, operation, quantity, amount, time} 
    })()

}