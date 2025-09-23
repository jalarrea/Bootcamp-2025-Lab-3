const User = require('../schemas/users');


const getAllUsers = (callback) => { 
    return User.findAllUsers(callback);
}

const getUserById = (id, callback) => {
    return User.findUserById(id, callback);
}

const getUserByApiKey = (id, callback) => {
    return User.findUserByApiKey(id, callback);
}

const getUserByEmail = (email, callback) => {
    return User.findUserByEmail(email, callback);
}

const saveUser = (user, callback) => {
    return User.saveUser(user, callback);
}

const updateUser = (id, user, callback) => {
    return User.updateUser(id, user, callback);
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByApiKey,
    getUserByEmail,
    saveUser,
    updateUser
}