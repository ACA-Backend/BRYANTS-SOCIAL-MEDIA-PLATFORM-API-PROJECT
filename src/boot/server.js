import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import listRoutes from 'express-list-routes';
import { createServer } from 'http';
import { NotFoundError } from '../lib/errorDefinitions.js';
import errorMiddleware from '../app/middlewares/errorMiddleware.js';
import  authRouter  from '../routes/authRoute.js';
import { postRouter } from '../routes/postRoutes.js';
import { commentRouter } from '../routes/commentRoute.js';

const app = express();
const server = createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

      //routes.
// route to check health
app.get('/health', (req, res) => {
  return res.json({
    success: true,
    message: 'The server is up and running',
  });
});
//other routes 
app.use('/api/v1/auth', authRouter);  
app.use('/api/v1/posts', postRouter);  
app.use('/api/v1/post',commentRouter);
//if route isnt found 
app.use('*', (req, res) => {
  throw new NotFoundError(`Route ${req.originalUrl} does not exist on this server`);
});

// Error handler
app.use(errorMiddleware);


listRoutes(app);

export { server, app };
