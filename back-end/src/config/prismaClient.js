// back-end/src/config/prismaClient.js

// 1. Correct the relative path to point to the generated client's index.js
// 2. Add the .js extension
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default prisma;
