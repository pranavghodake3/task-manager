const db = require('../models/index');
const UserModel = db.User;

const userService = {};

userService.getUsers = async () => {
    const users = await UserModel.findAll();

    return users;
}

module.exports = userService;
