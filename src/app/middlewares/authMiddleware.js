import { verifyToken } from '../providers/jwtProvider.js';
import { UnauthorizedError } from '../../lib/errorDefinitions.js';
import { User } from '../schema/userSchema.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.sub);
        if (!user) {
            throw new UnauthorizedError('No user found with this token');
        }

        req.user = user;
        next();
    } catch (error) {
        throw new UnauthorizedError('Invalid or missing token');
    }
};

export default authMiddleware;
