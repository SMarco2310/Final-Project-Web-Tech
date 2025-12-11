import express from "express";
import {
    createChat,
    getUserChats,
    getChatDetails,
} from "../controllers/chatControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const chatRouter = express.Router();

// Create a new chat
chatRouter.post("/", authenticate, createChat);

// Get all chats for the logged-in user
chatRouter.get("/", authenticate, getUserChats);

// Get details of a specific chat
chatRouter.get("/:id", authenticate, getChatDetails);

export default chatRouter;
