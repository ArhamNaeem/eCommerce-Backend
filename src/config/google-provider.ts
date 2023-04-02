import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { InternalServerError } from '../errors';
dotenv.config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new InternalServerError('Client crediential are not completely provided')
}
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/redirect'

}, (accessToken,refreshToken,profile,done) => {
    console.log(profile)
}))
