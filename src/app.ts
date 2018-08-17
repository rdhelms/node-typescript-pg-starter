import express, { RequestHandler } from 'express';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { pool } from './database/db';
import bodyParser from 'body-parser';
import passport from 'passport';
import { localStrategy } from './passports/local.passport';
import { router as indexController } from './controllers/index.controller';
import { router as loginController } from './controllers/login.controller';
import { router as signupController } from './controllers/signup.controller';
import { TUser } from './types/User';

const app = express();

// Session middleware
const sessionStore = pgSession(session);
app.use(session({
    store: new sessionStore({
        pool
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || 'keyboard cat',
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session() as RequestHandler);
passport.serializeUser((user: TUser, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const client = await pool.connect();
        const text = 'SELECT * FROM users WHERE id = $1';
        const values = [id];
        const queryResult = await client.query(text, values);
        done(null, queryResult.rows[0] as TUser);
        client.release();
    } catch (err) {
        done(err);
    }
});
passport.use(localStrategy);

// Routes and Controllers
app.use('/', indexController);
app.use('/login', loginController);
app.use('/signup', signupController);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    // tslint:disable no-console
    console.info(`Listening on port ${port}`);
});

export { server };