-- CreateTable
CREATE TABLE "gifts" (
    "gift_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "title" TEXT NOT NULL,
    "text" VARCHAR(280) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("gift_id")
);

-- CreateIndex
CREATE INDEX "gifts_user_id_created_at_idx" ON "gifts"("user_id", "created_at" DESC);
