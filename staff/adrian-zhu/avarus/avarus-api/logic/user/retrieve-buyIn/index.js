const { validate, errors: { NotFoundError } } = require('avarus-util')
const { models: { Transaction, Sellout } } = require('avarus-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => { 

        const buyin = await Transaction.findById(id)

        if(!buyin) throw new NotFoundError(`we can't found this buy-in with id ${id}`)

        if (!Transaction) throw new NotFoundError(`Module with name ${Transaction} does not exist`)

        // await Sellout.populate('buyInTransaction')

        debugger

        const transaction = await Transaction.findById( id ).populate('user company relatedTo ')
        
        const {_id, company, stock, user, operation, quantity, amount, time} = transaction   

        let stockId = stock.toString()
        
        const stocked = company.stocks.filter(stocke => {
            if(stocke.id === stockId) return stock
       })
       
       const stockSelected = stocked[0]
        
        return {_id, company, stockSelected, user, operation, quantity, amount, time} 
    })()

}