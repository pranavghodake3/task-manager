const priorityService = require('../services/priorityService');
const makeBoolean = require('../utils/booleanHelper');

const priorityController = {};

priorityController.getPriorities = async (req) => {
    let { isDropdown } = req.query;
    isDropdown = makeBoolean(isDropdown);
    const priorities = await priorityService.getPriorities({
      isDropdown,
    });
    return { data: priorities };
};

priorityController.getPriority = async (req) => {
  const { id } = req.params;
  const priority = await priorityService.getPriorityById(id);
  return { data: priority };
};

priorityController.updatePriority = async (req) => {
  const { id } = req.params;
  const priority = await priorityService.updatePriority(id, req.body);
  return { data: priority };
};

module.exports = priorityController;
