import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
  connect(process.env.MONGO_URI!).then(
    () => console.log("connected to database..."),
    (error) => console.log(error)
  );
};
