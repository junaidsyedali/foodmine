import path from "path";
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import { dbConnect } from "./configs/config";
import dotenv from "dotenv";
dotenv.config();

dbConnect();

const app = express();
app.use(express.json());
app.use(cors());
app.disable("etag");

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static(path.join(__dirname, "public", "browser")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "browser", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
