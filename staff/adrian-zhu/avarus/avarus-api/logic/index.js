module.exports = {
    // User
    authenticateUser: require('./user/authenticate-user'),
    registerUser: require('./user/register-user'),
    retrieveUser: require('./user/retrieve-user'),
    modifyUser: require('./user/modify-user'),
    deleteUser: require('./user/delete-user'),
    AddFavorite: require('./user/favorite-user'),

    // Compnay
    createCompany: require('./company/create-company')
}