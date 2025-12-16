import { EntitySchema } from "typeorm";

export const ChatEntity = new EntitySchema({
    name: "Chat",
    tableName: "chats",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
    relations: {
        item: {
            type: "many-to-one",
            target: "Item",
            joinColumn: { name: "item_id" },
            onDelete: "CASCADE",
            nullable: true,
        },
        user1: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "user1_id" },
            onDelete: "CASCADE",
        },
        user2: {
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "user2_id" },
            onDelete: "CASCADE",
        },
        messages: {
            type: "one-to-many",
            target: "Message",
            inverseSide: "chat",
        },
    },
});
