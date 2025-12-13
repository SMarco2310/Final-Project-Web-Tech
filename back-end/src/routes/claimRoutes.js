import express from "express";
import {
    createClaim,
    getClaims,
    updateClaimStatus,
    getUserClaims,
} from "../controllers/claimControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const claimRouter = express.Router();

// Create a new claim
claimRouter.post("/", authenticate, createClaim);

// Get all claims
claimRouter.get("/", authenticate, getClaims);

// Get user claims
claimRouter.get("/my-claims", authenticate, getUserClaims);

// Update claim status
claimRouter.put("/:id/status", authenticate, updateClaimStatus);

export default claimRouter;
