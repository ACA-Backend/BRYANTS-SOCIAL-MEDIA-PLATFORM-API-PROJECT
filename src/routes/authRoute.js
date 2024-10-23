import express from 'express';
import { signUp, login } from '../app/controllers/authController.js';
import asyncHandler from '../lib/asyncHandler.js';
import  validate  from '../lib/inputValidator.js';
import { signUpValidation, loginValidation } from '../app/requests/authValidation.js';

const authRouter = express.Router();

authRouter.post('/signup', validate(signUpValidation), asyncHandler(signUp));
authRouter.post('/login', validate(loginValidation), asyncHandler(login));

export default authRouter ;
