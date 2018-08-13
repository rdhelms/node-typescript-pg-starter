import express from 'express';
import { router as indexController } from './controllers/index.controller';

const app = express();

app.use('/', indexController);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.info(`Listening on port ${port}`);
});

export { server };