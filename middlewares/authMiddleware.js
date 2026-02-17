const Joi = require('joi');
const { errorResponse } = require('../utils/responseHelper');
const UserModel = require('../models/userModel');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');

const authMiddleware = {};

authMiddleware.login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(req.body);
    const count = await UserModel.countDocuments({
      email: req.body.email,
    });
    if (count !== 1) {
      throw new CustomError('User does not exist for this email', 401);
    }

    next();
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

authMiddleware.register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().min(6).max(255).required(),
      repeat_password: Joi.ref('password'),
    });

    await schema.validateAsync(req.body);
    const count = await UserModel.countDocuments({
      email: req.body.email,
    });
    if (count > 0) {
      throw new CustomError('User already exists', 400);
    }
    console.log('User Count: ', count);

    next();
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

authMiddleware.isAuthentic = (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization?.split('Bearer ')[1];
    if (!req.headers.authorization || !bearerToken) {
      throw new CustomError('Missing Bearer Token', 401);
    }
    const data = jwtUtil.verifyToken(bearerToken);
    req.auth = {
      user: data.user,
    };
    if (data && !data.refreshToken) {
      next();
    } else {
      throw new CustomError('Invalid Bearer Token or it has expired', 401);
    }
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

authMiddleware.isRefreshTokenAuthentic = (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization?.split('Bearer ')[1];
    if (!req.headers.authorization || !bearerToken) {
      throw new CustomError('Missing Bearer Token', 401);
    }
    const data = jwtUtil.verifyToken(bearerToken);
    req.auth = {
      user: data.user,
    };
    if (data && data.refreshToken) {
      next();
    } else {
      throw new CustomError('Invalid Bearer Refresh Token or it has expired', 401);
    }
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

module.exports = authMiddleware;
