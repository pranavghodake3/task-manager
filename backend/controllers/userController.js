const userService = require('../services/userService');

const userController = {};

userController.getUsers = async () => {
    const users = await userService.getUsers();

    return {
        data: users
    };
}

module.exports = userController;
