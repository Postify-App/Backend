import express from 'express';
import { apiRoutes } from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

app.all(/.*/, notFound);

app.use(globalErrorHandler);

export default app;
