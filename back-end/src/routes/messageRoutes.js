import express from "express";
import {
    sendMessage,
    getMessages,
    markAsRead,
    getUnreadCount,
} from "../controllers/messageControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const messageRouter = express.Router();

// Send a message
messageRouter.post("/", authenticate, sendMessage);

// Get messages for a specific chat
messageRouter.get("/:chatId", authenticate, getMessages);

// Get unread count
messageRouter.get("/unread/count", authenticate, getUnreadCount);

// Mark messages as read
messageRouter.put("/:chatId/read", authenticate, markAsRead);

export default messageRouter;
