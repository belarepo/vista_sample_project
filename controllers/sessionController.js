import session from 'express-session';
import MongoStore from 'connect-mongo';

export const setSession = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: +process.env.SESSION_DURATION,
  },
  store: MongoStore.create({
    mongoUrl: process.env.SESSION_CONNECTION_STRING,
  }),
});
