// back-end/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Recommended: See Best Practices below
import imageRouter from "./src/routes/imageRoutes.js";
import itemRouter from "./src/routes/itemRoutes.js";
import authRouter from "./src/routes/authRoutes.js";

// FIX: Import the singleton instance from your config file
import prisma from "./src/config/prismaClient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Apply CORS middleware

async function main() {
  try {
    // Connection check
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`The server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process on DB failure
  }
}

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);
app.use("/api/image", imageRouter);

main();
