module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    modifyUser: require('./modify-user'),
    deleteUser: require('./delete-user'),
    saveProfileImage: require('./save-profile-image'),
    loadProfileImage: require('./load-profile-image'),
    createWish: require('./create-wish'),
    listWishes: require('./list-wishes'),
    modifyWish: require('./modify-wish'),
    deleteWish: require('./delete-wish'),
    saveWishImage: require('./save-wish-image'),
    loadWishImage: require('./load-wish-image'),
    givenWish: require('./given-wish'),
    blockedWish: require('./block-wish')
}