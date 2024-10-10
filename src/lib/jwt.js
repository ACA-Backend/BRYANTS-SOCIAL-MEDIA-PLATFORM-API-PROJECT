import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    secretKey,
    { expiresIn: '1h' } // 1h is said to be standerd
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
