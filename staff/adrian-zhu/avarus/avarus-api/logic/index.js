module.exports = {
    // User
    authenticateUser: require('./user/authenticate-user'),
    registerUser: require('./user/register-user'),
    retrieveUser: require('./user/retrieve-user'),
    retrieveBuyin: require('./user/retrieve-buyIn'),
    retrieveSellout: require('./user/retrieve-sellout'),
    editUser: require('../logic/user/edit-user'),
    deleteUser: require('./user/delete-user'),
    buyIn: require('./user/buy-in-stock'),
    sellOut: require('./user/sell-out-stock'),

    // Company
    createCompany: require('./company/create-company'),
    createPrice: require('./company/create-price'),
    producePrice: require('./company/produce-price'),
    authenticateCompany: require('./company/authenticate-company'),
    retrieveCompanies: require('./company/retrieve-companies'),
    retrieveCompany: require('./company/retrieve-company'),
    retrievePrice: require('./company/retrieve-price'),
    retriveAvgPrice: require('./company/retrieve-avgPrice'),
    retrieveCompanyCategory: require('./company/retrieve-companyCategory'),
    retrieveCompanyName: require('./company/retrieve-companyByName'),
    editCompany: require('./company/edit-company')
}