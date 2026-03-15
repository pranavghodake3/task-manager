const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;
