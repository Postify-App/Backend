import { createClient } from 'redis';

import logger from './logger';

const client = createClient({
  username: 'default',
  password: 'WTailBmlWMxNhCrKnAxxbtN8VRIUifVo',
  socket: {
    host: 'redis-18704.crce176.me-central-1-1.ec2.redns.redis-cloud.com',
    port: 18704,
  },
});

client.on('error', (err) => logger.error('Redis Client Error', err));
client
  .connect()
  .then(() => logger.info('Redis Connected Successfully'))
  .catch((err) => logger.error('Redis Client Error', err));

export default client;
