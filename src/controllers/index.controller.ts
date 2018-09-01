import express from 'express';
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            res.send('Welcome to app_name');
        } catch(err) {
            console.error(err);
            res.status(500).send(`Error: ${JSON.stringify(err, null, 4)}`);
        }
    });

export { router };