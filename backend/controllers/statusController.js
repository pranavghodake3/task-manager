const statusService = require('../services/statusService');
const makeBoolean = require('../utils/booleanHelper');

const statusController = {};

statusController.getStatuses = async (req) => {
    let { isDropdown } = req.query;
    isDropdown = makeBoolean(isDropdown);
    const statuses = await statusService.getStatuses({
      isDropdown,
    });
    return { data: statuses };
};

statusController.getStatus = async (req) => {
  const { id } = req.params;
  const status = await statusService.getStatusById(id);
  return { data: status };
};

statusController.updateStatus = async (req) => {
  const { id } = req.params;
  const status = await statusService.updateStatus(id, req.body);
  return { data: status };
};

module.exports = statusController;
