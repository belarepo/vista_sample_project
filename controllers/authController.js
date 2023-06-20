import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export function getLoginHandler(req, res) {
  res.render('login');
}
export function postLoginHandler(req, res) {
  res.render('login');
}
export function getSignupHandler(req, res) {
  res.render('signup');
}
export async function postSignupHandler(req, res, next) {
  try {
    if (!req.body.terms_consent || !req.body.email || !req.body.password) {
      return res.redirect('/signup');
    }
    if (User.findOne({ email: req.body.email })) {
      return res.redirect('/login');
    }
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      +process.env.BCRYPT_SALT_ROUNDS
    );
    const newUser = new User();
    newUser.password = hashedPassword;
    newUser.email = req.body.email;
    newUser.referral = req.body.referral;
    await newUser.save();

    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  } catch (err) {
    next(err);
  }
}
export function getLogoutHandler(req, res) {
  res.render('login');
}

export function checkUserLogedIn(req, res, next) {
  if (req.session.passport) {
    return next();
  }
  res.redirect('/login');
}
