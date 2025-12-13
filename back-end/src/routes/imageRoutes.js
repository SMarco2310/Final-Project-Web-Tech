import { uploadImage } from "../controllers/imageControllers.js";
import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

const imageRouter = express.Router();
imageRouter.post("/upload", authenticate, upload.single("image"), uploadImage);

export default imageRouter;
