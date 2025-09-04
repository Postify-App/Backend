import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import env from './config/env';
import { apiRoutes } from './routes';
import notFound from './middlewares/notFound';
import { rateLimit } from 'express-rate-limit';
import healthCheck from './middlewares/healthCheck';
import globalErrorHandler from './middlewares/globalErrorHandler';

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 400,
  message: 'You reached your limit, Please try again later.',
});

const app = express();

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.ALLOWED_ORIGINS?.split(',')
        : '*',
    credentials: true,
  })
);

// Rate Limiting
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Health check endpoint
app.use('/api', apiRoutes);
app.get('/health', healthCheck);

app.all(/.*/, notFound);

app.use(globalErrorHandler);

export default app;
