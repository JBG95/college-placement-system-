/*
  Warnings:

  - You are about to drop the column `applicationDeadline` on the `Job` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "applicationDeadline",
ADD COLUMN     "deadline" TEXT NOT NULL;
