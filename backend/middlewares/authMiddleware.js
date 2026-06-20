const Joi = require('joi');
const { errorResponse } = require('../utils/responseHelper');
const db = require('../models');
const UserModel = db.User;
const RefreshTokenModel = db.RefreshToken;
const CompanyModel = db.Company;
const ProjectModel = db.Project;
const { getUserByIdWithRole } = require('../services/userService');
const CustomError = require('../utils/CustomError');
const jwtUtil = require('../utils/jwtUtil');
const { ROLES } = require('../constants');
const { getMyCompany } = require('../services/companyService');

const authMiddleware = {};

authMiddleware.login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().required(),
    });

    await schema.validateAsync(req.body || {});
    const count = await UserModel.count({
      where: {
        email: req.body.email,
      },
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
    const count = await UserModel.count({
      where: {
        email: req.body.email,
      },
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

    const companyCount = await CompanyModel.count({
      where: {
        name: req.body.name,
      },
    });
    if (companyCount > 0) {
      throw new CustomError('Company already exists', 400);
    }

    const count = await UserModel.count({
      where: {
        email: req.body.email,
      },
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

    const count = await UserModel.count({
      where: {
        email: req.body.email,
      },
    });
    if (count > 0) {
      throw new CustomError('User already exists', 400);
    }
    const { companyId, projectId } = req.params;
    const project = await ProjectModel.findByPk(projectId);
    if (!project || project.company.toString() !== companyId) {
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

    const count = await UserModel.count({
      where: {
        email: req.body.email,
      },
    });
    if (count > 0) {
      throw new CustomError('User already exists', 400);
    }
    const { companyId, projectId } = req.params;
    const project = await ProjectModel.findByPk(projectId);
    if (!project || project.company.toString() !== companyId) {
      throw new CustomError('Project or Company does not exists', 400);
    }

    next();
  } catch (error) {
    return errorResponse(res, error, 400);
  }
};

authMiddleware.isAuthentic = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization?.split('Bearer ')[1];

    if (!bearerToken) {
      throw new CustomError('Missing Bearer Token or it is Undefined', 401);
    }
    const data = jwtUtil.verifyToken(bearerToken);
    console.log("datadatadatadatadata: ",data);
    const user = await getUserByIdWithRole(data.userId);
    req.auth = {
      user,
    };
    if(user.roleInfo.name === ROLES.COMPANY_ADMIN){
      req.auth = {
        ...req.auth,
        company: await getMyCompany(user.id),
      }
    }
    console.log("req.auth: ",req.auth);
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
    const refreshToken = await RefreshTokenModel.findOne({
      where: {
        refreshToken: bearerToken,
      },
    });
    if (validToken && refreshToken) {
      req.auth = {
        user: {
          userId: refreshToken.userId,
        },
      };
      const currentDate = new Date();
      const refreshTokenExpiry = new Date(refreshToken.expiresAt);
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

authMiddleware.isRefreshTokenCookieAuthentic = async (req, res, next) => {
  try {
    console.log('Cookies: ', req.cookies.refreshToken);
    let bearerToken = req.cookies.refreshToken;
    if (!bearerToken) {
      throw new CustomError('Missing Refresh Token', 401);
    }
    const validToken = jwtUtil.verifyRefreshToken(bearerToken);
    const refreshToken = await RefreshTokenModel.findOne({
      where: {
        refreshToken: bearerToken,
      },
    });
    console.log("validToken: ",validToken);
    console.log("refreshToken: ",refreshToken);
    if (validToken && refreshToken) {
      req.auth = {
        user: {
          userId: refreshToken.userId,
        },
      };
      const currentDate = new Date();
      const refreshTokenExpiry = new Date(refreshToken.expiresAt);
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
