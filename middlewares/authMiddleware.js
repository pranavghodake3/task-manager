const Joi = require('joi');
const { errorResponse } = require('../utils/responseHelper');
const UserModel = require('../models/UserModel');
const RefreshTokenModel = require('../models/RefreshTokenModel');
const CompanyModel = require('../models/CompanyModel');
const ProjectModel = require('../models/ProjectModel');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');

const authMiddleware = {};

authMiddleware.login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(req.body || {});
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

    await schema.validateAsync(req.body || {});
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

authMiddleware.registerCompany = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().min(6).max(255).required(),
      repeat_password: Joi.ref('password'),
    });
    await schema.validateAsync(req.body || {});

    const companyCount = await CompanyModel.countDocuments({
      name: req.body.name,
    });
    if (companyCount > 0) {
      throw new CustomError('Company already exists', 400);
    }

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

authMiddleware.registerCompanyProjectManager = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().min(6).max(255).required(),
      repeat_password: Joi.ref('password'),
    });
    await schema.validateAsync(req.body || {});

    const count = await UserModel.countDocuments({
      email: req.body.email,
    });
    if (count > 0) {
      throw new CustomError('User already exists', 400);
    }
    const { companyId, projectId } = req.params;
    const project = await ProjectModel.findById(projectId).lean().exec();
    if (!project || project?.company?.toString() !== companyId) {
      throw new CustomError('Project or Company does not exists', 400);
    }

    next();
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

authMiddleware.registerCompanyProjectUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().min(6).max(255).required(),
      repeat_password: Joi.ref('password'),
    });
    await schema.validateAsync(req.body || {});

    const count = await UserModel.countDocuments({
      email: req.body.email,
    });
    if (count > 0) {
      throw new CustomError('User already exists', 400);
    }
    const { companyId, projectId } = req.params;
    const project = await ProjectModel.findById(projectId).lean().exec();
    if (!project || project?.company?.toString() !== companyId) {
      throw new CustomError('Project or Company does not exists', 400);
    }

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
    if (data) {
      next();
    } else {
      throw new CustomError('Invalid Bearer Token or it has expired', 401);
    }
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

authMiddleware.isRefreshTokenAuthentic = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization?.split('Bearer ')[1];
    if (!req.headers.authorization || !bearerToken) {
      throw new CustomError('Missing Bearer Token', 401);
    }
    const validToken = jwtUtil.verifyRefreshToken(bearerToken);
    const refreshToken = await RefreshTokenModel.find({
      refreshToken: bearerToken,
    })
      .limit(1)
      .lean()
      .exec();
    if (validToken && refreshToken.length === 1) {
      req.auth = {
        user: {
          userId: refreshToken[0].userId,
        },
      };
      const currentDate = new Date();
      const refreshTokenExpiry = new Date(refreshToken[0].expiresAt);
      if (currentDate < refreshTokenExpiry) {
        next();
      } else {
        throw new CustomError('Bearer Refresh Token is expired', 401);
      }
    } else {
      throw new CustomError('Invalid Bearer Refresh Token or it has expired', 401);
    }
  } catch (error) {
    return errorResponse(res, error, 401);
  }
};

module.exports = authMiddleware;
