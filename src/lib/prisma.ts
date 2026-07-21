// lib/prisma.ts
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg"; //
import { Pool } from "pg"; //
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL!;

const createPrismaClient = () => {
  // Branching on process.env.NODE_ENV here doesn't work: Vite inlines
  // NODE_ENV to a build-time constant, so `vite build` always resolves this
  // to the same branch regardless of the runtime DATABASE_URL. The adapter
  // choice has to depend on an actual runtime value instead.
  if (connectionString.includes("neon.tech")) {
    // Neon (WebSockets)
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({ adapter });
  }

  // Standard TCP via pg adapter (local Docker Postgres, etc.)
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
