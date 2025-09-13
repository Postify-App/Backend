/*
  Warnings:

  - You are about to drop the column `isPosted` on the `Post` table. All the data in the column will be lost.
  - Added the required column `approximateWords` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasEmojis` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "isPosted",
ADD COLUMN     "approximateWords" INTEGER NOT NULL,
ADD COLUMN     "file" TEXT,
ADD COLUMN     "forbiddenWords" TEXT[],
ADD COLUMN     "hasEmojis" BOOLEAN NOT NULL,
ADD COLUMN     "requiredWords" TEXT[],
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "scheduledAt" DROP DEFAULT;
