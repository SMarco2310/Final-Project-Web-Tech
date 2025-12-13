// back-end/server.js
import express from "express";
import dotenv from "dotenv";
import AppDataSource from "./src/config/dataSource.js";
import cors from "cors";
import imageRouter from "./src/routes/imageRoutes.js";
import itemRouter from "./src/routes/itemRoutes.js";
import authRouter from "./src/routes/authRoutes.js";
import claimRouter from "./src/routes/claimRoutes.js";
import chatRouter from "./src/routes/chatRoutes.js";
import messageRouter from "./src/routes/messageRoutes.js";
import aiRouter from "./src/routes/aiRoutes.js";
import "reflect-metadata";
dotenv.config();

// this is to initialize the database connection
AppDataSource.initialize()
  .then(() => console.log("TypeORM connected"))
  .catch((err) => console.error("TypeORM Error:", err));

// this is to initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);
app.use("/api/image", imageRouter);
app.use("/api/claims", claimRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
