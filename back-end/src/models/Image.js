import { EntitySchema } from "typeorm";

export const ImageEntity = new EntitySchema({
  name: "Image",
  tableName: "images",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      autoIncrement: true,
    },
    url: {
      type: "varchar",
    },
  },
  relations: {
    item: {
      type: "many-to-one",
      target: "Item",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
