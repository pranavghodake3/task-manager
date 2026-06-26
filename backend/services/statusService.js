const db = require('../models/index');
const StatusModel = db.Status;

const statusService = {};

statusService.getStatuses = async ({ isDropdown = false }) => {
  const where = {};
  let attributes = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }
  return await StatusModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
  });
};

statusService.getStatusById = async (id) => {
  return await StatusModel.findByPk(id);
};

statusService.updateStatus = async (id, reqBody) => {
  await StatusModel.update(reqBody, {
    where: { id },
  });
  return reqBody;
};

module.exports = statusService;
