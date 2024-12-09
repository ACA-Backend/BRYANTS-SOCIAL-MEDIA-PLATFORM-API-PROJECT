import Joi from 'joi';

// Validation funtion for user registration
export const signUpValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  dateOfBirth: Joi.date().iso().required()
});

// Validation function for user login
export const loginValidation = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

