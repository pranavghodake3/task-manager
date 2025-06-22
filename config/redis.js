const Redis = require('ioredis');

// Create a single Redis connection
const redis = new Redis(6379, "redis");

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.error('Redis connection error:', err));

class MyRedis {
    constructor(myredis) {
        this.myredis = myredis;
    }
    async set(key, value) {
        return await this.myredis.set(key, JSON.stringify(value));
    }
    async get(key) {
        const data = await this.myredis.get(key);
        return JSON.parse(data);
    }
}

const myredisObj = new MyRedis(redis);

module.exports = myredisObj;
