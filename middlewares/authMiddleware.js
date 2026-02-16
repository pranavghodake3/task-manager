const Joi = require('joi');
const { errorResponse } = require('../utils/responseHelper');
const UserModel = require('../models/userModel');
const CustomError = require('../utils/CustomError');

const authMiddleware = {};

authMiddleware.register = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      lastName: Joi.string().pattern(new RegExp('^[a-zA-Z]')).max(255).required(),
      email: Joi.string().min(3).max(255).email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
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

module.exports = authMiddleware;
