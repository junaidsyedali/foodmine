import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/config";
import dotenv from "dotenv";
dotenv.config();

dbConnect();

const app = express();
app.use(express.json());
const PORT = 5000;
app.use(cors({ credentials: true, origin: ["http://localhost:4200"] }));
app.disable("etag");

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
