const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../constants/index');

const jwtUtilObj = {};

jwtUtilObj.getToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

  return {
    accessToken,
    accessTokenExpiresIn: TOKEN_EXPIRY,
  };
};

jwtUtilObj.verifyToken = (bearerToken) => {
  try {
    return jwt.verify(bearerToken, process.env.JWT_SECRET);
  } catch {
    return false;
  }
};

jwtUtilObj.getRefreshToken = (data) => {
  // const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const nowTimestamp = Date.now();
  const oneDayFromNowTimestamp = nowTimestamp + REFRESH_TOKEN_EXPIRY * 1000;
  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
    expiresIn: oneDayFromNowTimestamp,
  });

  return {
    refreshToken,
    refreshTokenExpiresIn: oneDayFromNowTimestamp,
  };
};

jwtUtilObj.verifyRefreshToken = (bearerToken) => {
  try {
    return jwt.verify(bearerToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return false;
  }
};

module.exports = jwtUtilObj;
