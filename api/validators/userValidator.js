const Joi = require('joi');

const UserCreateInput = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    username: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const UserLoginInput = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
    password: Joi.string().min(6).required()
});

module.exports = { UserCreateInput, UserLoginInput };