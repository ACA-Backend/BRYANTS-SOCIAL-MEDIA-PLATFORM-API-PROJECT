import { body } from 'express-validator';

export const validatePost = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters')
];
