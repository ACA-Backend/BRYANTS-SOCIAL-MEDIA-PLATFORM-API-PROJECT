import express from 'express';
import { createComment, getCommentsByPost } from '../app/controllers/commentController.js';
import CreateCommentRequest from '../app/requests/createCommentRequest.js';
import asyncHandler from '../lib/asyncHandler.js';
import authMiddleware from '../app/middlewares/authMiddleware.js';
import validator from '../lib/inputValidator.js';
import { BadRequestError } from '../lib/errorDefinitions.js';

const commentRouter = express.Router();

// Route to create a new comment
commentRouter.post('/:postId', authMiddleware, (req, res, next) => {
    // Validate the request body
    const { errors, value } = validator(createCommentValidation, req.body);
    if (errors) {
        return next(new BadRequestError('Validation failed', errors));
    }
    req.body = value; // Attaching validated data to the request object
    next();
}, asyncHandler(createComment));

// Route to fetch comments for a post
commentRouter.get('/:postId', authMiddleware, asyncHandler(getCommentsByPost));

export { commentRouter };
