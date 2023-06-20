import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oidc';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

// config local strategy
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
      return cb(null, false);
    } catch (err) {
      return cb(err);
    }
  })
);

// config google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['profile', 'email'],
    },
    async function verify(issuer, profile, cb) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        }

        const newUser = new User();
        newUser.googleId = profile.id;
        newUser.email = profile.emails[0].value;
        newUser.username = profile.displayName;
        console.log(profile);
        await newUser.save();

        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  )
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
