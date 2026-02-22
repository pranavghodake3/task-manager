const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

const UserProjectModel = mongoose.model('UserProject', userProjectSchema);

module.exports = UserProjectModel;
