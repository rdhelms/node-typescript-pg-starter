import express, { RequestHandler } from 'express';
import session from 'express-session';
import ConnectSessionSequelize from 'connect-session-sequelize';
import { sequelize } from './sequelize/db';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { localStrategy } from './passports/local.passport';
import { router as indexController } from './controllers/index.controller';
import { router as loginController } from './controllers/login.controller';
import { router as signupController } from './controllers/signup.controller';
import { TUser } from './types/User';
import User from './sequelize/models/user.model';

const app = express();

// Cookie middleware
app.use(cookieParser());

// Session middleware
const SequelizeStore = ConnectSessionSequelize<session.Store>(session.Store);
const storeInstance = new SequelizeStore({
    db: sequelize,
    table: 'Session'
});
app.use(session({
    secret: process.env.COOKIE_SECRET || 'keyboard cat',
    store: storeInstance,
    resave: false,
    saveUninitialized: false,
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
        const user = await User.findOne({
            where: {
                id
            }
        });
        if (user) {
            done(null, user);
        } else {
            throw new Error('No user found');
        }
    } catch (err) {
        done(err);
    }
});
passport.use(localStrategy);

// Routes and Controllers
app.use('/', indexController);
app.use('/login', loginController);
app.use('/signup', signupController);

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        // tslint:disable-next-line no-console
        console.log(`Listening on port ${port}`);
    });
}

export { app };