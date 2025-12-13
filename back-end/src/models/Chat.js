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
        item_id: {
            type: "int",
            nullable: true,
        },
        user1_id: {
            type: "uuid",
        },
        user2_id: {
            type: "uuid",
        },
        createdAt: {
            type: "datetime",
            createDate: true,
        },
        updatedAt: {
            type: "datetime",
            updateDate: true,
        },
    },
    relations: {
        item: {
            type: "many-to-one",
            target: "Item",
            joinColumn: { name: "item_id" },
            onDelete: "CASCADE",
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
