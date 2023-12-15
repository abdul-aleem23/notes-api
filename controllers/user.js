import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 404));

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setCookie(user, res, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid credentials", 400));

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return next(new ErrorHandler("Invalid credentials", 400));

    setCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // for cross-site cookies
      secure: process.env.NODE_ENV === "development" ? false : true, // for cross-site cookies
    })
    .json({
      success: true,
      message: "Logged out",
    });
};

export const getProfile = (req, res) => {
  //isauth will run before this function

  res.status(200).json({
    success: true,
    user: req.user,
  });
};
