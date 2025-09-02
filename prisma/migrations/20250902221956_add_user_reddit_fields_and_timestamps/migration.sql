/*
  Warnings:

  - A unique constraint covering the columns `[redditAccessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[redditRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "redditAccessToken" TEXT,
ADD COLUMN     "redditExpiresIn" TIMESTAMP(3),
ADD COLUMN     "redditRefreshToken" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "User_redditAccessToken_key" ON "public"."User"("redditAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_redditRefreshToken_key" ON "public"."User"("redditRefreshToken");
