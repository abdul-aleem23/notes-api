import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
};
