const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site;
