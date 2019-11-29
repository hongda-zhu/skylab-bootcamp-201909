module.exports = {
    // User
    authenticateUser: require('./user/authenticate-user'),
    registerUser: require('./user/register-user'),
    retrieveUser: require('./user/retrieve-user'),
    editUser: require('./user/edit-user'),
    deleteUser: require('./user/delete-user'),
    AddFavorite: require('./user/favorite-user'),

    // Compnay
    createCompany: require('./company/create-company'),
    authenticateCompany: require('./company/authenticate-company'),
    retrieveCompanies: require('./company/retrieve-Companies'),
    retrieveCompany: require('./company/retrieve-company'),
    updateCompany: require('./company/update-company')
}