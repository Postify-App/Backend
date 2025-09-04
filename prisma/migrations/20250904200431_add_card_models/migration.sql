-- CreateTable
CREATE TABLE "public"."MainTopic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "MainTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ToneOfVoice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "ToneOfVoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MainGoal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "MainGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TargetAudience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "TargetAudience_pkey" PRIMARY KEY ("id")
);
