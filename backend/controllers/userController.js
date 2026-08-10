const userService = require('../services/userService');
const makeBoolean = require('../utils/booleanHelper');

const userController = {};

userController.getUsers = async (req) => {
  const { auth } = req;
  const { companyId } = req.query;
  const globalProjectId = req.cookies.globalProjectId;
  let { isDropdown } = req.query;
  isDropdown = makeBoolean(isDropdown);
  const role = req.auth.user.globalRole.name;
  const users = await userService.getUsers({
    auth,
    role,
    companyId,
    projectId: globalProjectId,
    isDropdown,
  });
  return { data: users };
};

userController.getUnAssignedUsers = async (req) => {
  const { auth } = req;
  const { companyId } = req.query;
  const globalProjectId = req.cookies.globalProjectId;
  let { isDropdown } = req.query;
  isDropdown = makeBoolean(isDropdown);
  const role = req.auth.user.globalRole.name;
  const users = await userService.getUnAssignedUsers({
    auth,
    role,
    companyId,
    projectId: globalProjectId,
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

userController.createUser = async (req) => {
  const { auth } = req;
  const user = await userService.createUser(auth, req.body);
  return { data: user, statusCode: 201 };
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
