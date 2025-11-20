import express from "express";
import dotenv from "dotenv";

import itemRouter from "./src/routes/itemRoutes.js";
import authRouter from "./src/routes/authRoutes.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
// port config
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

main();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);

// this need to be at the very end of the file
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
