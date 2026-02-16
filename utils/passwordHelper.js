const bcrypt = require('bcrypt');

const passwordHelperObj = {};

passwordHelperObj.generatePasswordHash = async (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

passwordHelperObj.comparePassword = async (password, hash) => {
  const compare = bcrypt.compareSync(password, hash);
  return compare;
};

module.exports = passwordHelperObj;
