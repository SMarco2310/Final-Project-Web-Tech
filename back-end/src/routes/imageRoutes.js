import handler from "../controllers/imageControllers.js";
import express from "express";

const imageRouter = express.Router();
imageRouter.post("/upload", handler);

export default imageRouter;
