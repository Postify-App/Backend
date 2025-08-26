import app from './app';
import env from './config/env';
import logger from './config/logger';

process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION😱 Shutting down ...` + err);

  process.exit(1);
});

const server = app.listen(env.PORT, () => {
  logger.info(`Server is running on port: ${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION🐳 Shutting down ...' + err);

  server.close(() => {
    process.exit(1);
  });
});
