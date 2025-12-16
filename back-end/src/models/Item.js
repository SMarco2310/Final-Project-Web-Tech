import { EntitySchema } from "typeorm";

export const CATEGORY = {
  CLOTHING: "Clothing",
  ACCESSORIES: "Accessories",
  ELECTRONICS: "Electronics",
  DOCUMENTS: "Documents",
  ACCESSORIES: "Accessories",
  BOOKS: "Books",
  OTHER: "Other",
};

export const STATUS = {
  LOST: "Lost",
  FOUND: "Found",
  CLAIMED: "Claimed",
};

export const ItemEntity = new EntitySchema({
  name: "Item",
  tableName: "items",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      autoIncrement: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    category: {
      type: "enum",
      default: CATEGORY.OTHER,
      enum: Object.values(CATEGORY),
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    status: {
      type: "enum",
      default: STATUS.FOUND,
      enum: Object.values(STATUS),
    },
    location: {
      type: "varchar",
      nullable: true,
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
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      inverseSide: "items",
      onDelete: "CASCADE",
    },
    images: {
      type: "one-to-many",
      target: "Image",
      inverseSide: "item",
    },
  },
});
