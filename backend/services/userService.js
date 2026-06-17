const db = require('../models/index');
const UserModel = db.User;
const RoleModel = db.Role;

const userService = {};

userService.getUsers = async () => {
    const users = await UserModel.findAll();

    return users;
}

userService.getUserByIdWithRole = async (userId) => {
    const user = await UserModel.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: {
            id: userId,
        },
        include: [
            {
            model: RoleModel,
            as: 'roleInfo'
            }
        ]
    });
    return user.get({
        plain: true
    });
};

module.exports = userService;
