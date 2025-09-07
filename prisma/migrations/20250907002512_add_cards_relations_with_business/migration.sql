/*
  Warnings:

  - You are about to drop the column `mainGoal` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `mainTopic` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `targetAudience` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `toneOfVoice` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Business" DROP COLUMN "mainGoal",
DROP COLUMN "mainTopic",
DROP COLUMN "targetAudience",
DROP COLUMN "toneOfVoice",
ADD COLUMN     "mainGoalId" TEXT,
ADD COLUMN     "mainTopicId" TEXT,
ADD COLUMN     "targetAudienceId" TEXT,
ADD COLUMN     "toneOfVoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_mainGoalId_fkey" FOREIGN KEY ("mainGoalId") REFERENCES "public"."MainGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_mainTopicId_fkey" FOREIGN KEY ("mainTopicId") REFERENCES "public"."MainTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_toneOfVoiceId_fkey" FOREIGN KEY ("toneOfVoiceId") REFERENCES "public"."ToneOfVoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_targetAudienceId_fkey" FOREIGN KEY ("targetAudienceId") REFERENCES "public"."TargetAudience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
