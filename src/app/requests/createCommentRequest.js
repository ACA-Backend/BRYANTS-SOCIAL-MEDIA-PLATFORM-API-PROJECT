import Joi from 'joi';

// this is the validation schema for creating a comment
export const CreateCommentRequest = Joi.object({
    postId: Joi.string().required().messages({
        'string.base': 'Post ID must be a valid string',
        'any.required': 'Post ID is required'
    }),
    content: Joi.string().min(1).max(5000).required().messages({
        'string.base': 'Comment content must be a valid string',
        'string.min': 'Comment must be at least 1 character long',
        'string.max': 'Comment must not exceed 500 characters',
        'any.required': 'Comment content is required'
    })
});

export default CreateCommentRequest;
