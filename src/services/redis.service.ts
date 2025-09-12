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

  setJSON = async (key: string, val: object, ttlInHours: number) => {
    await redis.SETEX(key, ttlInHours * 60 * 60, JSON.stringify(val));
  };

  getJSON = async <T>(key: string): Promise<T | null> => {
    const res = await redis.GET(key);
    return res ? JSON.parse(res) : null;
  };
}

export default new RedisService();
