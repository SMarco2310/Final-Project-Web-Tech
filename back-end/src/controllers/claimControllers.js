import AppDataSource from "../config/dataSource.js";
import { ClaimEntity, STATUS as CLAIM_STATUS } from "../models/Claim.js";
import { ItemEntity, STATUS as ITEM_STATUS } from "../models/Item.js";

export const createClaim = async (req, res) => {
    try {
        const { itemId, reason, proof_images, contact_phone } = req.body;
        const claimerId = req.user.id;
        const itemRepository = AppDataSource.getRepository(ItemEntity);
        const claimRepository = AppDataSource.getRepository(ClaimEntity);

        const item = await itemRepository.findOneBy({ id: itemId });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.status !== ITEM_STATUS.FOUND) {
            return res.status(400).json({ message: "Item is not available for claim" });
        }

        const existingClaim = await claimRepository.findOne({
            where: { item: itemId, claimer: claimerId },
        });

        if (existingClaim) {
            return res.status(400).json({ message: "You have already claimed this item" });
        }


        const newClaim = claimRepository.create({
            item: { id: itemId },
            claimer: { id: claimerId },
            status: CLAIM_STATUS.PENDING,
            reason: reason,
            proof_images: proof_images || [],
            contact_phone: contact_phone
        });
        await claimRepository.save(newClaim);

        return res.status(201).json({ message: "Claim submitted successfully", claim: newClaim });
    } catch (error) {
        console.error("Error creating claim:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getClaims = async (req, res) => {
    try {
        const claimRepository = AppDataSource.getRepository(ClaimEntity);

        const claims = await claimRepository.find({
            relations: {
                item: true,
                claimer: true,
            },
            order: {
                createdAt: "DESC",
            },
        });

        return res.status(200).json(claims);
    } catch (error) {
        console.error("Error fetching claims:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserClaims = async (req, res) => {
    try {
        const claimerId = req.user.id;
        const claimRepository = AppDataSource.getRepository(ClaimEntity);

        const claims = await claimRepository.find({
            where: {
                claimer: { id: claimerId }
            },
            relations: {
                item: true,
            },
            order: {
                createdAt: "DESC",
            },
        });

        return res.status(200).json(claims);
    } catch (error) {
        console.error("Error fetching user claims:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateClaimStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!Object.values(CLAIM_STATUS).includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const claimRepository = AppDataSource.getRepository(ClaimEntity);
        const itemRepository = AppDataSource.getRepository(ItemEntity);

        const claim = await claimRepository.findOne({
            where: { id },
            relations: { item: true },
        });

        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }

        claim.status = status;
        await claimRepository.save(claim);

        if (status === CLAIM_STATUS.APPROVED) {
            const item = await itemRepository.findOneBy({ id: claim.item.id });
            if (item) {
                item.status = ITEM_STATUS.CLAIMED;
                await itemRepository.save(item);
            }
        }

        return res.status(200).json({ message: "Claim status updated", claim });
    } catch (error) {
        console.error("Error updating claim status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
