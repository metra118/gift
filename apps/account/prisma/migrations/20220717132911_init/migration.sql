-- CreateTable
CREATE TABLE "sessions" (
    "session_id" VARCHAR(36) NOT NULL,
    "access_token" VARCHAR(4096) NOT NULL,
    "refresh_token" VARCHAR(4096) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
