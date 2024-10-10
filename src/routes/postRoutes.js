import express from 'express';
import { createPost, updatePost, deletePost, getPost } from '../app/controllers/postController.js';
import { createPostValidation } from '../app/requests/postValidation.js';
import { validate } from '../lib/inputValidator.js';
import asyncHandler from '../lib/asyncHandler.js';
import authMiddleware from '../app/middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.post('/', authMiddleware, validate(createPostValidation), asyncHandler(createPost));
postRouter.get('/:id', authMiddleware, asyncHandler(getPost));
postRouter.put('/:id', authMiddleware, asyncHandler(updatePost));
postRouter.delete('/:id', authMiddleware, asyncHandler(deletePost));

export { postRouter };

