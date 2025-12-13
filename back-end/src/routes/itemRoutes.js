import {
  getAllItems,
  getItemById,
  createItem,
  deleteItem,
  getMyItems,
} from "../controllers/itemControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";
import express from "express";

const itemRouter = express.Router();

itemRouter.get("/items", getAllItems);
itemRouter.get("/my-items/:user_id", getMyItems);

itemRouter.post("/", authenticate, createItem);

itemRouter.get("/item/:id", getItemById);

itemRouter.delete("/item/:id", authenticate, deleteItem);

export default itemRouter;
