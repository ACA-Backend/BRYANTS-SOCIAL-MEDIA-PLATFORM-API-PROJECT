import jwt from 'jsonwebtoken'
import appConfig from '../../config/appConfig.js';

export const generateToken = (payload) => {
    return jwt.sign(payload, appConfig.jwt.secret, {
        expiresIn: appConfig.jwt.expiresIn
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, appConfig.jwt.secret);
};
