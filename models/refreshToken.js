const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  refreshToken: String,
  userId: String,
  expiresAt: Date,
});

const RefreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

module.exports = RefreshTokenModel;
