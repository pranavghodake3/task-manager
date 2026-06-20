const db = require('../models/index');
const PriorityModel = db.Priority;
const RoleModel = db.Role;

const priorityService = {};

priorityService.getPriorities = async ({ isDropdown = false }) => {
  const where = {};
  let attributes = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }
  return await PriorityModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
  });
};

priorityService.getPriorityById = async (id) => {
  return await PriorityModel.findByPk(id, {
    include: [
      {
        model: RoleModel,
        as: 'roleInfo'
      }
    ]
  });
};

priorityService.updatePriority = async (id, reqBody) => {
  await PriorityModel.update(reqBody, {
    where: { id },
  });
  return reqBody;
};

module.exports = priorityService;
