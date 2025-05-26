"use server";

import { db } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    // Use a transaction to ensure consistent connection handling
    return await db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { clerkUserId: userId },
      });

      // If user doesn't exist in the database, create them
      if (!user) {
        const clerkUser = await currentUser();
        if (!clerkUser) throw new Error("Clerk user not found");

        const primaryEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId);
        if (!primaryEmail) throw new Error("No email address found");

        await tx.user.create({
          data: {
            clerkUserId: userId,
            email: primaryEmail.emailAddress,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
            imageUrl: clerkUser.imageUrl,
          },
        });
        return { isOnboarded: false };
      }

      return {
        isOnboarded: !!user.industry,
      };
    });
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
