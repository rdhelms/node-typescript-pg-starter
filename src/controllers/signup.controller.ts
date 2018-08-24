import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from '../sequelize/models/user.model';

interface IReqBody {
    username: string;
    password: string;
}

router.route('/')
    .post(async (req, res) => {
        try {
            const body = req.body as IReqBody;

            // Encrypt password using bcrypt
            const hash = await bcrypt.hash(body.password, 10);
    
            const newUser = await User.create({
                username: body.username,
                password: hash
            });

            res.json(newUser);
        } catch (err) {
            res.json(err);
        }
    });

export { router };