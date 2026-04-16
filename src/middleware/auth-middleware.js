import session from 'express-session';
import ConnectMongo from 'connect-mongo';

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

export const sessionMiddleware = session({
    name: 'kc20-nodejs',
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: INACTIVITY_2_DAYS,
    },
    store: ConnectMongo.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    })
}); 