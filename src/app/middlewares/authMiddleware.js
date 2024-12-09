import { verifyToken } from '../providers/jwtProvider.js';
import { UnauthorizedError } from '../../lib/errorDefinitions.js';
import { User } from '../schema/userSchema.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization header missing or invalid:', authHeader);
        throw new UnauthorizedError('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        console.log('Decoded token:', decoded); // Debugging

        if (!decoded.sub || typeof decoded.sub !== 'string') {
            console.error('Invalid token payload:', decoded);
            throw new UnauthorizedError('Invalid token payload');
        }

        const user = await User.findById(decoded.sub);
        if (!user) {
            console.error('User not found with ID:', decoded.sub);
            throw new UnauthorizedError('No user found with this token');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message); // Debugging
        throw new UnauthorizedError('Invalid or missing token');
    }
};

export default authMiddleware;

