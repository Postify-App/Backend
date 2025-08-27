import redis from '../config/redis';

class RedisService {
  SETEX = async (key: string, val: string, ttl: number) => {
    await redis.SETEX(key, ttl * 60, val);
  };

  GET = async (key: string) => {
    return await redis.GET(key);
  };

  DEL = async (key: string) => {
    await redis.DEL(key);
  };
}

export default new RedisService();
