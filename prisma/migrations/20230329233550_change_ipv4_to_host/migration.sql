/*
  Warnings:

  - You are about to drop the column `ipv4` on the `Server` table. All the data in the column will be lost.
  - Added the required column `host` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" DROP COLUMN "ipv4",
ADD COLUMN     "host" TEXT NOT NULL;
