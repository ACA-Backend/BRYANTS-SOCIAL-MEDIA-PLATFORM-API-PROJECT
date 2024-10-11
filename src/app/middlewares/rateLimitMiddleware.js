import { rateLimit } from 'express-rate-limit';
import { TooManyRequestsError } from '../../lib/error-definitions.js';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  handler: (req, res) => {
    const retryAfter = Math.ceil(
      (this.windowMs - (Date.now() - this.store.get(req.ip).resetTime)) / 60000
    );
    throw new TooManyRequestsError(
      `Too many requests, please try again after ${retryAfter} minute(s).`
    );
  },
});

export default rateLimiter;
