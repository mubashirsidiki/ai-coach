-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateIndex
CREATE INDEX "User_clerkUserId_idx" ON "User"("clerkUserId");
