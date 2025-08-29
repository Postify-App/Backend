import express from 'express';
import { apiRoutes } from './routes';
import statusCodes from './utils/statusCodes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
  res.status(statusCodes.OK).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRoutes);

app.all(/.*/, notFound);

app.use(globalErrorHandler);

export default app;
