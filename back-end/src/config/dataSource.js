import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";
import { UserEntity } from "../models/User.js";
import { ClaimEntity } from "../models/Claim.js";
import { ItemEntity } from "../models/Item.js";
import { ImageEntity } from "../models/Image.js";
import { MessageEntity } from "../models/Message.js";
import { ChatEntity } from "../models/Chat.js";

dotenv.config();

const AppDataSource = new DataSource({
  type: "mysql",
    url: process.env.DATABASE_URL,
  // Automatically load all entity files in src/models
  entities: [UserEntity, ClaimEntity, ItemEntity, ImageEntity, MessageEntity, ChatEntity],
  migrations: ["../migrations/*.js"],

  synchronize: true, // ❗ dev only, turn off in production!
  logging: false,
});

export default AppDataSource;
