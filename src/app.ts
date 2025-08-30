import morgan from 'morgan';
import express from 'express';

import env from './config/env';
import { apiRoutes } from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(express.json());

app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use('/api', apiRoutes);

app.all(/.*/, notFound);

app.use(globalErrorHandler);

export default app;
