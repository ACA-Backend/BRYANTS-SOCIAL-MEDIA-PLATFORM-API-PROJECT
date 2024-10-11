import express from 'express';
import { createPost, updatePost, deletePost, getPost } from '../app/controllers/postController.js';
import createPostValidation from '../app/requests/postValidation.js';
import asyncHandler from '../lib/asyncHandler.js';
import authMiddleware from '../app/middleware/authMiddleware.js';
import validator from '../lib/inputValidator.js';
import { BadRequestError } from '../lib/errorDefinition.js'; 

const postRouter = express.Router();

postRouter.post('/', authMiddleware, (req, res, next) => {
    const { errors, value } = validator(createPostValidation, req.body);
    if (errors) {
        return next(new BadRequestError('Validation failed', errors)); 
    }
    req.body = value; 
    next();
}, asyncHandler(createPost));

postRouter.get('/:id', authMiddleware, asyncHandler(getPost));
postRouter.put('/:id', authMiddleware, asyncHandler(updatePost));
postRouter.delete('/:id', authMiddleware, asyncHandler(deletePost));

export { postRouter };


