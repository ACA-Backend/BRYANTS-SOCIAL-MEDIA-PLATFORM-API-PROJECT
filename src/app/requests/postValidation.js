import Joi from 'joi';

export const createPostValidation = Joi.object({
  title: Joi.string().min(3).required(),
  body: Joi.string().min(10).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});
