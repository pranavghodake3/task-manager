const db = require('../models/index');
const { getUserRoles } = require('../utils/commonHelper');
const UserModel = db.User;
const RoleModel = db.Role;

const userService = {};

userService.getUsers = async () => {
    const users = await UserModel.findAll({
        include: [
            {
                model: RoleModel,
                as: 'roleInfo'
            } 
        ]
    });

    return users;
};

userService.getUserRoles = async () => {
    const roles = await RoleModel.findAll({
        where: {
            name: getUserRoles()
        }
    });
    return roles;
};

userService.getUserById = async (id) => {
  return await UserModel.findByPk(id, {
    include: [
      {
        model: RoleModel,
        as: 'roleInfo'
      }
    ]
  });
};

userService.updateUser = async (id, reqBody) => {
  await UserModel.update(reqBody, {
    where: { id },
  });
  return reqBody;
};

userService.deleteUser = async (id) => {
  await UserModel.destroy({
    where: { id },
  });
};

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
