/*
  Warnings:

  - You are about to drop the column `redditAccessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `redditExpiresIn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `redditRefreshToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_redditAccessToken_key";

-- DropIndex
DROP INDEX "public"."User_redditRefreshToken_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "redditAccessToken",
DROP COLUMN "redditExpiresIn",
DROP COLUMN "redditRefreshToken";

-- CreateTable
CREATE TABLE "public"."Business" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "redditAccessToken" TEXT,
    "redditRefreshToken" TEXT,
    "redditExpiresIn" TIMESTAMP(3),
    "logo" TEXT,
    "mainTopic" TEXT NOT NULL,
    "toneOfVoice" TEXT NOT NULL,
    "mainGoal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
