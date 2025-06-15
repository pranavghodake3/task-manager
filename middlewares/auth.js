const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHelper")
const SECRET_KEY = process.env.SECRET_KEY;

const getToken = (userObj, expiry = 120) => {
    const token = jwt.sign(userObj, SECRET_KEY, {
        expiresIn: expiry,
    });
    return token;
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, SECRET_KEY);
        if (data) {
            return data;
        }
    } catch (error) {
        return false;
    }
};

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split("Bearer")[1]?.trim();
        if(!token)  throw new Error("Token Not Found");
        const data = verifyToken(token);
        if (!data)  throw new Error("Invalid Or Expired Token");
        next();
    } catch (error) {
        return errorResponse(res, error, 'Unauthorized', 401);
    }
}

module.exports = {
    getToken,
    verifyToken,
    isLoggedIn,
}