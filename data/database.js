import mongoose from "mongoose";

const MONGO_URI = "process.env.MONGO_URI";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbname: "notes-backend",
    })
    .then(() => console.log("Database: connected"))
    .catch((err) => console.log(err));
};
