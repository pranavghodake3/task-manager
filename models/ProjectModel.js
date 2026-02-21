const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;
