import { EntitySchema } from "typeorm";

export const MessageEntity = new EntitySchema({
    name: "Message",
    tableName: "messages",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        content: {
            type: "text",
        },
        isRead: {
            type: "boolean",
            default: false,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
    },
    relations: {
        chat: {
            type: "many-to-one",
            target: "Chat",
            joinColumn: { name: "chat_id" },
            inverseSide: "messages",
            onDelete: "CASCADE",
        },
        sender: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "sender_id" },
            onDelete: "CASCADE",
        },
    },
});
