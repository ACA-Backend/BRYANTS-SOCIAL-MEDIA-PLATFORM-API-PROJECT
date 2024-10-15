import Joi from 'joi'

const createPostValidation = Joi.object({
  title: Joi.string().min(1).required(),
  body: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  imageUrl: Joi.string().uri().optional(),
  userId: joi.string().required(),
});

export default createPostValidation;