const mongoose = require('mongoose');


const connect = async () => {
  await mongoose.connect('mongodb://root:example@mongo:27017/task_manager?authSource=admin');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

module.exports = connect;
