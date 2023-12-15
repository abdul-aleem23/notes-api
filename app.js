import express from "express";
import userRouter from "./routes/user.js";
import noteRouter from "./routes/note.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// MIDDLEWARES
app.use(express.json()); // for parsing application/json, use it before all routes.
app.use(cookieParser()); // for parsing cookies, use it before all routes.
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
})); 

// ERROR HANDLING MIDDLEWARE
app.use(errorMiddleware);

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});