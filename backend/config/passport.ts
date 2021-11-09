import  config  from './config';

import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import User from "../schemas/User"

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
    async (email, password, done) => {
        // Match Email's User
        const user = await User.findOne({ email: email });
        console.log(user)
        if (!user) {
          return done(null, false, { message: "Not User found." });
        } else {
          // Match Password's User
          const match = await user.matchPassword(password);
          if (match) {

            //dont expose password
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect Password." });
          }
        }
      }
  ));

passport.serializeUser((user:any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err:Error, user:any) => {
    done(err, user);
  });
});