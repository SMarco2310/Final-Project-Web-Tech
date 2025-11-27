import { EntitySchema } from "typeorm";

export const LocationEntity = new EntitySchema({
  name: "Location",
  tableName: "locations",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      autoIncrement: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    lon: {
      type: "decimal",
      precision: 10,
      scale: 6,
      nullable: true,
    },
    lat: {
      type: "decimal",
      precision: 10,
      scale: 6,
      nullable: true,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
  },
  relations: {
    items: {
      type: "one-to-many",
      target: "Item",
      inverseSide: "location",
    },
  },
});
