import express from 'express';
import { pool } from '../database/db';
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT NOW() as now');
            res.json(result);
            client.release();
        } catch(err) {
            console.error(err);
            res.send(`Error: ${JSON.stringify(err, null, 4)}`);
        }
    });

export { router };