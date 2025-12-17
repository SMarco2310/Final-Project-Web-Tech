import express from "express";
import {
    createClaim,
    getClaims,
    updateClaimStatus,
    getUserClaims,
    getIncomingClaims,
    getClaimById,
} from "../controllers/claimControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const claimRouter = express.Router();

// Create a new claim
claimRouter.post("/", authenticate, createClaim);

// Get all claims
claimRouter.get("/", authenticate, getClaims);

// Get user claims
claimRouter.get("/my-claims", authenticate, getUserClaims);

// Get received claims (claims on user's items)
claimRouter.get("/received", authenticate, getIncomingClaims);

// Get Single Claim
claimRouter.get("/:id", authenticate, getClaimById);

// Update claim status
claimRouter.put("/:id/status", authenticate, updateClaimStatus);

export default claimRouter;
