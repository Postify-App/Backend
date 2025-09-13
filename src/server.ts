import app from './app';
import env from './config/env';
import logger from './config/logger';
import { initSockets } from './socket';

process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION😱 Shutting down ...` + err);

  process.exit(1);
});

export const server = app.listen(env.PORT, () => {
  logger.info(`Server is running on port: ${env.PORT}`);
});

initSockets(server);

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION🐳 Shutting down ...' + err);

  server.close(() => {
    process.exit(1);
  });
});
