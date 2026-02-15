const Joi = require('joi');
const { errorResponse } = require('../utils/responseHelper');

const authMiddleware = {};

authMiddleware.register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).email().required(),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    repeat_password: Joi.ref('password'),
  });
  schema
    .validateAsync(req.body)
    .then(() => {
      next();
    })
    .catch((error) => {
      return errorResponse(res, error, error.message, 400);
    });
  // const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
};

module.exports = authMiddleware;
