import { EntitySchema } from "typeorm";

export const STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const ClaimEntity = new EntitySchema({
  name: "Claim",
  tableName: "claims",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    item_id: {
      type: "int",
    },
    claimer_id: {
      type: "uuid",
    },
    status: {
      type: "enum",
      default: STATUS.PENDING,
      enum: Object.values(STATUS),
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
      inverseSide: "claims",
      onDelete: "CASCADE",
    },
    claimer: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "claimer_id" },
      inverseSide: "claims",
      onDelete: "CASCADE",
    },
  },
});
