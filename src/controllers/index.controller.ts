import express from 'express';
import { sequelize } from '../sequelize/db';
import User from '../sequelize/models/user.model';
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            await sequelize.authenticate();
            const user = await User.findOne();
            res.json(user);
        } catch(err) {
            console.error(err);
            res.send(`Error: ${JSON.stringify(err, null, 4)}`);
        }
    });

export { router };