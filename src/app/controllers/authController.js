import User from '../schema/userSchema.js'
import { generateToken } from '../providers/jwtProvider.js';
import { BadRequestError, UnauthorizedError } from '../../lib/errorDefinitions.js';

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  try {
    // code to check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User already exists');
    }

    // Creating new user
    const user = new User({ username, email, password });
    await user.save();

    // Generating JWT token
    const token = generateToken(user);
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    // Finding the user
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user);
    
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
    });
  } catch (error) {
    next(error);
  }
};
