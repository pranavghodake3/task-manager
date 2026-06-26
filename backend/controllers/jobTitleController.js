const jobTitleService = require('../services/jobTitleService');
const makeBoolean = require('../utils/booleanHelper');

const jobTitleController = {};

jobTitleController.getJobTitles = async (req) => {
    let { isDropdown } = req.query;
    isDropdown = makeBoolean(isDropdown);
    const jobTitles = await jobTitleService.getJobTitles({
      isDropdown,
    });
    return { data: jobTitles };
};

jobTitleController.getJobTitle = async (req) => {
  const { id } = req.params;
  const jobTitle = await jobTitleService.getJobTitleById(id);
  return { data: jobTitle };
};

jobTitleController.updateJobTitle = async (req) => {
  const { id } = req.params;
  const jobTitle = await jobTitleService.updateJobTitle(id, req.body);
  return { data: jobTitle };
};

module.exports = jobTitleController;
