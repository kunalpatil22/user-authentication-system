const Joi = require("joi");

const userRegisterValidator = Joi.object({
  name: Joi.string().max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  repeat_password: Joi.ref("password"),
});

const userLoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { userRegisterValidator, userLoginValidator };
