import { EntitySchema } from "typeorm";

export const Role = {
  USER: "user",
  ADMIN: "admin",
};

export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    name: {
      type: "varchar",
    },
    student_id: {
      type: "varchar",
      nullable: true,
      unique: true,
    },
    password: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
      nullable: true,
    },
    role: {
      type: "enum",
      enum: [Role.USER, Role.ADMIN],
      default: Role.USER,
    },

    // adding this for bio
    bio: {
      type: "varchar",
      nullable: true,
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
    claims: {
      type: "one-to-many",
      target: "Claim",
      inverseSide: "claimer",
    },
    items: {
      type: "one-to-many",
      target: "Item",
      inverseSide: "user",
    },
  },
});
