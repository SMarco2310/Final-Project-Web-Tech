import AppDataSource from "../config/dataSource.js";
import { ChatEntity } from "../models/Chat.js";
import { ItemEntity } from "../models/Item.js";
import { UserEntity } from "../models/User.js";

import { IsNull } from "typeorm";

export const createChat = async (req, res) => {
    try {
        const { itemId, otherUserId } = req.body;
        const currentUserId = req.user.user_id;

        const chatRepository = AppDataSource.getRepository(ChatEntity);

        if (currentUserId === otherUserId) {
            return res.status(400).json({ message: "You cannot chat with yourself" });
        }

        // Check if ANY chat already exists between these two users
        // We prioritize the most recently updated chat if multiple exist
        const existingChat = await chatRepository.findOne({
            where: [
                { user1: { id: currentUserId }, user2: { id: otherUserId } },
                { user1: { id: otherUserId }, user2: { id: currentUserId } }
            ],
            order: { updatedAt: "DESC" },
            relations: {
                item: true,
                user1: true,
                user2: true
            }
        });

        if (existingChat) {
            return res.status(200).json({ message: "Chat already exists", chat: existingChat });
        }

        // Create new chat
        const newChat = chatRepository.create({
            item: itemId ? { id: itemId } : null,
            user1: { id: currentUserId },
            user2: { id: otherUserId },
        });

        await chatRepository.save(newChat);

        return res.status(201).json({ message: "Chat created successfully", chat: newChat });
    } catch (error) {
        console.error("Error creating chat:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserChats = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const chatRepository = AppDataSource.getRepository(ChatEntity);

        const chats = await chatRepository.find({
            where: [
                { user1: { id: userId } },
                { user2: { id: userId } },
            ],
            relations: {
                item: true,
                user1: true,
                user2: true,
                messages: true, // Optional: fetch last message for preview
            },
            order: {
                updatedAt: "DESC",
            },
        });

        return res.status(200).json(chats);
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getChatDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const chatRepository = AppDataSource.getRepository(ChatEntity);

        const chat = await chatRepository.findOne({
            where: { id },
            relations: {
                item: true,
                user1: true,
                user2: true,
                messages: true,
            },
        });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        return res.status(200).json(chat);
    } catch (error) {
        console.error("Error fetching chat details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
