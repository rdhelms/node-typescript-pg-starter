import { pool } from '../database/db';
import { Strategy as LocalStrategy } from 'passport-local';
import { TUser } from '../types/User';
import bcrypt from 'bcrypt';

const localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const client = await pool.connect();
        const text = 'SELECT * FROM users WHERE username=$1';
        const values = [username];
        const queryResult = await client.query(text, values);

        if (!queryResult || queryResult.rows.length === 0) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const user = queryResult.rows[0] as TUser;

        // Verify password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return done(null, false, { message: 'Incorrect password.' });
        }
    
        done(null, user);
        client.release();
        
    } catch (err) {
        done(err);
    }
});

export { localStrategy };