import mongoose from "mongoose";

const MONGO_URI = "process.env.MONGO_URI";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbname: "notes-backend",
    })
    .then((c) => console.log(`Database connected to ${c.connection.host}`))
    .catch((err) => console.log(err));
};
