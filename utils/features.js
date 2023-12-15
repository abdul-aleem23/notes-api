import jwt from "jsonwebtoken";

export const setCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000, // 48 hours
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none", // for cross-site cookies
      secure: process.env.NODE_ENV === "development" ? false : true, // for cross-site cookies
    })
    .json({
      success: true,
      message,
    });
};
