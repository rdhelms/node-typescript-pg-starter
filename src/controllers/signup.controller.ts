import express from 'express';
const router = express.Router();
import { pool } from '../database/db';
import bcrypt from 'bcrypt';

interface IReqBody {
    username: string;
    password: string;
}

router.route('/')
    .post(async (req, res) => {
        try {
            const body = req.body as IReqBody;
    
            const client = await pool.connect();
            const text = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
            // Encrypt password using bcrypt
            const hash = await bcrypt.hash(body.password, 10);
            const values = [body.username, hash];
            const result = await client.query(text, values);
    
            res.json(result.rows[0]);
            client.release();
        } catch (err) {
            res.json(err);
        }
    });

export { router };