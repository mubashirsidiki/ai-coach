import { PrismaClient } from '@prisma/client';

const globalForPrisma = global || globalThis;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Recommended for serverless environments
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Export a function to explicitly connect when needed
export async function connectDB() {
  try {
    await db.$connect();
    return true;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return false;
  }
}

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
