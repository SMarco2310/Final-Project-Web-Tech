import { PrismaClient } from "@prisma/client";

// this will allow us to map the object to the database and interact with it
const prisma = new PrismaClient();
export default prisma;
