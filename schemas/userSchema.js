import Joi from "joi";

export const registerSchema = Joi.object({
  
  email: Joi.string().required(),
  password: Joi.string().required(),
  password_conform: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const verifySchema = Joi.object({
  email: Joi.string().required().messages({ 'any.required': 'missing required field email' }),
});