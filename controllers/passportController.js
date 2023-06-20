import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return cb(null, false);
      }
      if (await bcrypt.compare(password, user.password)) {
        return cb(null, user);
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user._id });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
