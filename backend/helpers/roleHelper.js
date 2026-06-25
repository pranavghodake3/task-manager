const db = require('../models');

const roleHelper = {};

roleHelper.getRoleByName = async (roleName, attributes = ['id', 'name']) => {
  return await db.Role.findOne({
    attributes,
    where: {
      name: roleName
    }
  });
};

roleHelper.getJobTitleByName = async (jobTitleName, attributes = ['id', 'name']) => {
  return await db.JobTitle.findOne({
    attributes,
    where: {
      name: jobTitleName
    }
  });
};

module.exports = roleHelper;
