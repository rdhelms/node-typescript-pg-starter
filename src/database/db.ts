import { Pool, PoolConfig } from 'pg';

const poolConfig: PoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
};

const pool = new Pool(poolConfig);

export { pool };
