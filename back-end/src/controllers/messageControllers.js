import AppDataSource from "../config/dataSource.js";
import { MessageEntity } from "../models/Message.js";
import { ChatEntity } from "../models/Chat.js";

export const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        const senderId = req.user.user_id;

        const messageRepository = AppDataSource.getRepository(MessageEntity);
        const chatRepository = AppDataSource.getRepository(ChatEntity);

        // Check if chat exists
        const chat = await chatRepository.findOneBy({ id: chatId });
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        // Create message
        const newMessage = messageRepository.create({
            chat: { id: chatId },
            sender: { id: senderId },
            content,
        });

        await messageRepository.save(newMessage);

        // Update chat's updatedAt timestamp
        await chatRepository
            .createQueryBuilder()
            .update(ChatEntity)
            .set({ updatedAt: new Date() })
            .where("id = :id", { id: chatId })
            .execute();

        return res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


 //   this returns the messages of a specify chat 
export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messageRepository = AppDataSource.getRepository(MessageEntity);

        const messages = await messageRepository.find({
            where: { chat: { id: chatId } },
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
        const userId = req.user.user_id;
        const messageRepository = AppDataSource.getRepository(MessageEntity);

        await messageRepository
            .createQueryBuilder()
            .update(MessageEntity)
            .set({ isRead: true })
            .where("chat = :chatId", { chatId })
            .andWhere("sender != :userId", { userId })
            .execute();

        return res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        console.error("Error marking messages as read:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const messageRepository = AppDataSource.getRepository(MessageEntity);

        const count = await messageRepository
            .createQueryBuilder("message")
            .innerJoin("message.chat", "chat")
            .where("message.isRead = :isRead", { isRead: false })
            .andWhere("message.sender != :userId", { userId })
            .andWhere("(chat.user1 = :userId OR chat.user2 = :userId)", { userId })
            .getCount();

        return res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching unread count:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
