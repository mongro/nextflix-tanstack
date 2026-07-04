// lib/prisma.ts
import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg"; //
import { Pool } from "pg"; //

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL!;
console.log(process.env.DATABASE_URL);

const createPrismaClient = () => {
  // 1. Production / Neon Logic (WebSockets)
  if (connectionString.includes("neon.tech")) {
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
