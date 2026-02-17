const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRY } = require('../constants/index');

const jwtUtilObj = {};

jwtUtilObj.getToken = (data, expiresIn = TOKEN_EXPIRY) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn });

  return token;
};

jwtUtilObj.verifyToken = (bearerToken) => {
  try {
    return jwt.verify(bearerToken, process.env.JWT_SECRET);
  } catch {
    return false;
  }
};

module.exports = jwtUtilObj;
