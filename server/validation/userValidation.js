import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().pattern(/^[a-zA-Z]{2,30}$/),
  lastName: Joi.string().pattern(/^[a-zA-Z]{2,30}$/),
  password: Joi.string().min(8),
  confirmPassword: Joi.ref("password"),
  email: Joi.string().email().required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
});
