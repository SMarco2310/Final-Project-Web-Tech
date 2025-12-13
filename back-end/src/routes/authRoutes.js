import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/userControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile/:id", authenticate, getProfile);
authRouter.put("/profile/:id", authenticate, updateProfile);

export default authRouter;
