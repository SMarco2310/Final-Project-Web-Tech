import express from "express";
import { describeItem } from "../controllers/aiControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const aiRouter = express.Router();


aiRouter.post("/describe", authenticate, describeItem);

export default aiRouter;