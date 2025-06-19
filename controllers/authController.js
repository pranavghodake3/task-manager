const { successResponse, errorResponse } = require("../utils/responseHelper");
const { getToken, verifyToken } = require("../middlewares/auth")

const user = {
    email: 'test@gmail.com',
    password: '123'
}

const login = async (req, res) => {
    try {
        const reqBody = req.body;
        if(reqBody.email !== user.email){
            throw new Error("Incorrect Email Or Password");
        }
        const token = getToken(user);
        const refreshToken = getToken(user, 60 * 5, true);
        return successResponse(res, {
            token,
            refreshToken
        });
    } catch (error) {
        return errorResponse(res, error);
    }
};

const signup = async (req, res) => {
    try {
        const response = await authService.authFirstFunction();
        return successResponse(res, response);
    } catch (error) {
        return errorResponse(res, error);
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.headers['authorization'].split("Bearer")[1]?.trim();
        if(!refreshToken)  throw new Error("Refresh Token Not Found");
        const data = verifyToken(refreshToken);
        if (!data || !data.isRefreshToken)  throw new Error("Invalid Or Expired Refresh Token");
        const newToken = getToken(data.user);
        return successResponse(res, {
            newToken
        });
    } catch (error) {
        return errorResponse(res, error, 'Unauthorized', 401);
    }
};

module.exports = {
    login,
    signup,
    refreshToken,
};
