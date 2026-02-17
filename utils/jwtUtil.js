const jwt = require('jsonwebtoken');

const jwtUtilObj = {};

jwtUtilObj.getToken = (data, expiresIn = '1h') => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn });

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
