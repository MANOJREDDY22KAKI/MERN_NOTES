import mongoose from "mongoose";
import express from "express";
import User from "../models/userModel.js";
import {RegisterUser,LoginUser,LogoutUser,verifyToken} from "../controllers/userController.js";
import authenticate from "../middleware/authentication.js"


const router = express.Router();

// register route
router.post("/register",RegisterUser);

// login route
router.post("/login",LoginUser);

router.get("/verify",verifyToken);

// logout route
router.post('/logout',LogoutUser);

export default router;