import express from "express";
import productRouter from "./routes/products";
import connectDB from "./db/connect";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import dotenv from "dotenv";
import 'express-async-errors'
import authRouter from "./routes/auth";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API");
});

app.use("/api/v1/products", productRouter);
app.use('/api/v1/auth/',authRouter)
app.use(notFound)
app.use(errorHandler)
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`LISTENING ON PORT ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};


start()
