import express from "express";
const authRouter = express.Router();
import { login, register } from "../controllers/auth/User";
import passport from "passport";
import '../config/google-provider'

authRouter.route("/register").post(register);
authRouter.route("/google").get(passport.authenticate('google', {
    scope:["profile"]
}))
authRouter.route("/login").post(login);
export default authRouter;
