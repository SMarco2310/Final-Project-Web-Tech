import {uploadImage} from "../controllers/imageControllers.js";
import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";

const imageRouter = express.Router();
imageRouter.post("/upload", authenticate, uploadImage);

export default imageRouter;
