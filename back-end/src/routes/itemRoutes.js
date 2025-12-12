import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
} from "../controllers/itemControllers.js";
import { authenticate, authorizeItemOwner } from "../middleware/authMiddleware.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getAllItems);

itemRouter.post("/item", authenticate, authorizeItemOwner, createItem);

itemRouter.get("/item/:id", getItemById);

itemRouter.delete("/item/:id", authenticate, authorizeItemOwner, deleteItem);

export default itemRouter;
