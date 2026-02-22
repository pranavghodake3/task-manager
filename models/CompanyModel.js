const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = CompanyModel;
