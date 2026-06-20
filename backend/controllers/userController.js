const userService = require('../services/userService');
const makeBoolean = require('../utils/booleanHelper');

const userController = {};

userController.getUsers = async (req) => {
    const { companyId } = req.query;
    let { isDropdown } = req.query;
    isDropdown = makeBoolean(isDropdown);
    const role = req.auth.user.roleInfo.name;
    const users = await userService.getUsers({
      userId: req.auth.user.id,
      role,
      companyId,
      isDropdown,
    });
    return { data: users };
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
