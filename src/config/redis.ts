import { createClient } from 'redis';

import logger from './logger';

const client = createClient();

client.on('error', (err) => logger.error('Redis Client Error', err));
client
  .connect()
  .then(() => logger.info('Redis Connected Successfully'))
  .catch((err) => logger.error('Redis Client Error', err));

export default client;
