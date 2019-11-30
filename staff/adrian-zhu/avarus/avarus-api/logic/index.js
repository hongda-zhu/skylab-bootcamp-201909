module.exports = {
    // User
    authenticateUser: require('./user/authenticate-user'),
    registerUser: require('./user/register-user'),
    retrieveUser: require('./user/retrieve-user'),
    editUser: require('./user/edit-user'),
    deleteUser: require('./user/delete-user'),
    AddFavorite: require('./user/favorite-user'),
    buyIn: require('./user/buy-in-stock'),

    // Company
    createCompany: require('./company/create-company'),
    producePrice: require('./company/produce-price'),
    authenticateCompany: require('./company/authenticate-company'),
    retrieveCompanies: require('./company/retrieve-companies'),
    retrieveCompany: require('./company/retrieve-company'),
    retrievePrice: require('./company/retrieve-price'),
    editCompany: require('./company/edit-company')

}