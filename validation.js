//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const register = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  //Validate data before user made
  return schema.validate(data);
};

//Register Validation
const login = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  //Validate data before user made
  return schema.validate(data);
};

module.exports.register = register;
module.exports.login = login;
