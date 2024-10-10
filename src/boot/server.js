import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import listRoutes from 'express-list-routes';
import { createServer } from 'http';
import { NotFoundError } from '../lib/errorDefinitions.js';
import errorMiddleware from '../app/middleware/errorMiddleware.js';
import { authRouter } from '../routes/auth.js';
import { postRouter } from '../routes/postRoutes.js';

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  return res.json({
    success: true,
    message: 'The server is up and running',
  });
});

// Routes
app.use('/api/v1/auth', authRouter);  
app.use('/api/v1/posts', postRouter);  

// Route not found code
app.use('*', (req, res) => {
  throw new NotFoundError(`Route ${req.originalUrl} does not exist on this server`);
});

// Error handler
app.use(errorMiddleware);


listRoutes(app);

export { server, app };
