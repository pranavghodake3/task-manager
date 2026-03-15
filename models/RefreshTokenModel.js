const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const RefreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

module.exports = RefreshTokenModel;
