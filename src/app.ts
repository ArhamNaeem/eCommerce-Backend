import express from "express";
import productRouter from "./routes/products";
import connectDB from "./db/connect";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import dotenv from "dotenv";
import "express-async-errors";
import authRouter from "./routes/auth";
import { InternalServerError } from "./errors";
import passport from "passport";
import session from "express-session";

const app = express();
dotenv.config();
const ENCRYPTION_KEY = process.env.COOKIE_ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  throw new InternalServerError("Cookie encryption key not defined");
}
app.use(
  session({
    secret: ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API");
});
app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    //redirect from here
    res.send(req.user);
  }
);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth/", authRouter);

app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new InternalServerError("URI NOT DEFINED!");
    }
    await connectDB(uri);

    app.listen(port, () => {
      console.log(`LISTENING ON PORT ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
