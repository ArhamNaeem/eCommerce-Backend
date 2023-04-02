import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { InternalServerError } from "../errors";
import { UserModel } from "../models/auth/User";
dotenv.config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new InternalServerError(
    "Client crediential are not completely provided"
  );
}

passport.serializeUser((user: any, done) => {
    done(null,user.id)
})
passport.deserializeUser(async(id, done) => {
      try {
        const user = await UserModel.findById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
})
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName } = profile;
      const name = profile.name?.givenName;
         try {
           let user = await UserModel.findOne({ googleId: id });
           if (user) {
            //  console.log("user already exists");
             done(null, user);
           } else {
             const newUser = await UserModel.create({
               name: name,
               username: displayName,
               googleId: id,
             });
            //  console.log("new user created:", newUser);
             done(null, newUser);
           }
         } catch (err:any) {
           done(err,undefined);
         }
    }
  )
);
