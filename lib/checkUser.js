import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        const loggedInUser = await db.user.findUnique({
          where: {
            clerkUserId: user.id,
          },
        });

        if (loggedInUser) {
          return loggedInUser;
        }

        const name = `${user.firstName} ${user.lastName}`;

        const newUser = await db.user.create({
          data: {
            clerkUserId: user.id,
            name,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
          },
        });

        return newUser;
      } catch (error) {
        retries++;
        console.error(`Database attempt ${retries} failed:`, error);
        
        if (error.code === 'P1001') {
          throw new Error("Database connection failed. Please check your connection settings.");
        }
        
        if (error.code === 'P2002') {
          throw new Error("User already exists in the database.");
        }

        if (retries === MAX_RETRIES) {
          throw new Error("Failed to access database after multiple attempts. Please try again later.");
        }

        // Wait before retrying
        await wait(RETRY_DELAY * retries);
      }
    }
  } catch (error) {
    if (error.message.includes('Database')) {
      throw error; // Re-throw database-specific errors
    }
    console.error("Auth error in checkUser:", error);
    throw new Error("Authentication failed. Please try signing in again.");
  }
};
