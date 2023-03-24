import express from "express";
import productRouter from "./routes/products";
import connectDB from "./db/connect";
import dotenv from "dotenv";


const app = express();
dotenv.config();
const port = process.env.PORT || 5000

app.use(express.json());


app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/v1/products", productRouter);

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
