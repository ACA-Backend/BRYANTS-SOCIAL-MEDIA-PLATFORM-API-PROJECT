import Joi from 'joi'

const registerRequest = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    dateOfBirth: Joi.date().iso().required()
});

export default registerRequest;
