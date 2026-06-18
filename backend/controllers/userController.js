const userService = require('../services/userService');

const userController = {};

userController.getUsers = async () => {
    const users = await userService.getUsers();

    return {
        data: users
    };
};

userController.getUserRoles = async () => {
    const roles = await userService.getUserRoles();

    return {
        data: roles
    };
};

userController.getUser = async (req) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  return { data: user };
};

userController.updateUser = async (req) => {
  const { id } = req.params;
  const user = await userService.updateUser(id, req.body);
  return { data: user };
};

userController.deleteUser = async (req) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return { statusCode: 204 };
};

module.exports = userController;
