const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;
