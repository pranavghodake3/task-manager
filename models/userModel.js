const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
