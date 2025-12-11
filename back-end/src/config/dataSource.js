import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";
import { UserEntity } from "../models/User.js";
import { ClaimEntity } from "../models/Claim.js";
import { ItemEntity } from "../models/Item.js";
import { ImageEntity } from "../models/Image.js";
import { LocationEntity } from "../models/Location.js";
import { MessageEntity } from "../models/Message.js";
import { ChatEntity } from "../models/Chat.js";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // Automatically load all entity files in src/models
  entities: [UserEntity, ClaimEntity, ItemEntity, ImageEntity, LocationEntity, MessageEntity, ChatEntity],
  migrations: ["../migrations/*.js"],

  synchronize: true, // ❗ dev only, turn off in production!
  logging: false,
});

export default AppDataSource;
