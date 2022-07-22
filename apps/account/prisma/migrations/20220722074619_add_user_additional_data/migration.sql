/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" VARCHAR(70),
ADD COLUMN     "first_name" VARCHAR(64),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_name" VARCHAR(64),
ADD COLUMN     "nickname" VARCHAR(32);

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");
