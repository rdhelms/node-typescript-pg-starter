import express, { RequestHandler } from 'express';
import passport from 'passport';
const router = express.Router();

router.route('/')
    .post(passport.authenticate('local') as RequestHandler, (req, res) => {
        res.json(req.user);
    });

export { router };