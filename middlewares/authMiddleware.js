const Joi = require('joi');
const { validationError } = require('../utils/responseHelper');

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

    next();
  } catch (error) {
    return validationError(res, error, 400);
  }
};

module.exports = authMiddleware;
