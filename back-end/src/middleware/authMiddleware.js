import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    req.user = decoded; // contains id & role
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

// Admin-only check
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") return res.sendStatus(403);
  next();
};
// User-only check
export const authorizeUser = (req, res, next) => {
  if (req.user.role !== "USER") return res.sendStatus(403);
  next();
};

// Check if the user is the owner of the item
export const authorizeItemOwner = (req, res, next) => {
  if (req.user.id !== req.params.id) return res.sendStatus(403);
  next();
};