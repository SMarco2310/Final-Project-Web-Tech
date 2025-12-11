import AppDataSource from "../config/dataSource.js";
import { MessageEntity } from "../models/Message.js";
import { ChatEntity } from "../models/Chat.js";

export const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        const senderId = req.user.id;

        const messageRepository = AppDataSource.getRepository(MessageEntity);
        const chatRepository = AppDataSource.getRepository(ChatEntity);

        // Check if chat exists
        const chat = await chatRepository.findOneBy({ id: chatId });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Create message
        const newMessage = messageRepository.create({
            chat_id: chatId,
            sender_id: senderId,
            content,
        });

        await messageRepository.save(newMessage);

        // Update chat's updatedAt timestamp
        chat.updatedAt = new Date();
        await chatRepository.save(chat);

        return res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messageRepository = AppDataSource.getRepository(MessageEntity);

        const messages = await messageRepository.find({
            where: { chat_id: chatId },
            order: {
                createdAt: "ASC",
            },
            relations: {
                sender: true,
            },
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id;
        const messageRepository = AppDataSource.getRepository(MessageEntity);

        // Update all messages in this chat sent by the OTHER user to isRead: true
        // This requires a more complex query or iterating. For simplicity, we'll assume we mark all unread messages in this chat as read.
        // Ideally, we should filter by sender_id != userId.

        await messageRepository
            .createQueryBuilder()
            .update(MessageEntity)
            .set({ isRead: true })
            .where("chat_id = :chatId", { chatId })
            .andWhere("sender_id != :userId", { userId })
            .execute();

        return res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        console.error("Error marking messages as read:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
