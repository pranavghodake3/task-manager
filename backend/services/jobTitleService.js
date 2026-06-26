const db = require('../models/index');
const JobTitleModel = db.JobTitle;

const jobTitleService = {};

jobTitleService.getJobTitles = async ({ isDropdown = false }) => {
  const where = {};
  let attributes = [];
  if(isDropdown){
    attributes = ['id', 'name'];
  }
  return await JobTitleModel.findAll({
    ...(where && { where }),
    ...(attributes.length > 0 && { attributes }),
  });
};

jobTitleService.getJobTitleById = async (id) => {
  return await JobTitleModel.findByPk(id);
};

jobTitleService.updateJobTitle = async (id, reqBody) => {
  await JobTitleModel.update(reqBody, {
    where: { id },
  });
  return reqBody;
};

module.exports = jobTitleService;
