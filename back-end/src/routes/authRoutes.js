import express from "express";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getProfile,
} from "../controllers/authController.js";

dotenv.config();

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", authMiddleware, getUser);
router.get("/profile", authMiddleware, getProfile);
