const { model } = require('mongoose')
const { user, company, stock, transaction, sellout } = require('./schemas')

module.exports = {
    User: model('User', user),
    Company: model('Company', company),
    Stock: model('Stock', stock),
    Transaction: model('Transaction', transaction),
    Sellout: model('Sellout', sellout)
}