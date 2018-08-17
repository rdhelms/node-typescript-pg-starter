import express from 'express';
import { sequelize } from '../sequelize/db';
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            await sequelize.authenticate();
            res.send('Connected with sequelize-typescript');
        } catch(err) {
            console.error(err);
            res.send(`Error: ${JSON.stringify(err, null, 4)}`);
        }
    });

export { router };