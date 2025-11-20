import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
} from "../controllers/itemControllers.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getAllItems);

itemRouter.post("/item", authenticate, createItem);

itemRouter.get("/item/:id", getItemById);

itemRouter.delete("/item/:id", authenticate, authorizeAdmin, deleteItem);

export default itemRouter;
