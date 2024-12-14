/*
  Warnings:

  - The primary key for the `bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tenants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tenants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `tenants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `end_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tenant_id` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `service_id` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `services` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tenant_id` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tenant_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_service_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_pkey",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenant_id",
ADD COLUMN     "tenant_id" INTEGER NOT NULL,
DROP COLUMN "service_id",
ADD COLUMN     "service_id" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "tenant_id",
ADD COLUMN     "tenant_id" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_pkey",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "tenant_id",
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "telegram_id" BIGINT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "tenant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_telegram_id_tenant_id_key" ON "admins"("telegram_id", "tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenant_id_telegram_id_key" ON "users"("tenant_id", "telegram_id");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
