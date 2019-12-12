module.exports = {
    buyIn: require('./create-buyin'),
    editUser: require('./edit-user'),
    createPrice: require('./create-price'),
    sellOut: require('./create-sellout'),
    producePrice: require('./produce-price'),
    retrievePrices: require('./retrieve-prices'),
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    toggleFav : require('./toggle-fav'),

    retrieveUser: require('./retrieve-user'),
    retrieveBuyin: require('./retrieve-buyin'),
    retrieveCompanies: require('./retrieve-companies'),
    retrieveCompanyDetail: require('./retrieve-companyDetail'),
    retrieveCompanyByName: require('./retrieve-companyByName'),
    retrieveCompanyById: require('./retrieve-companyById'),
    retrieveCompanyByCategory: require('./retrieve-companyByCategory')
}