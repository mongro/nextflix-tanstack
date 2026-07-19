// lib/prisma.ts
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg"; //
import { Pool } from "pg"; //
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL!;
console.log(process.env.DATABASE_URL);

const createPrismaClient = () => {
  console.log("create PrismaClient", process.env.DATABASE_URL);
  // 1. Production / Neon Logic (WebSockets)
  if (
    process.env.NODE_ENV === "production" ||
    connectionString.includes("neon.tech")
  ) {
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  }

  // 2. Local Docker Logic (Standard TCP via pg adapter)
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
