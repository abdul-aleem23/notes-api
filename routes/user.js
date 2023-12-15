import express from "express";
import { register, login, getProfile, logout } from "../controllers/user.js"; 
import { isAuth } from "../middlewares/auth.js";

// router is a mini version of app
const router = express.Router(); 


// Routes
router.post("/new", register);

router.post("/login", login);

router.get("/logout", isAuth, logout);

router.get("/me", isAuth, getProfile);




export default router;