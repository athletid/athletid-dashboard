/*
  Warnings:

  - You are about to alter the column `subTitle` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10000)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Section` MODIFY `subTitle` VARCHAR(191) NOT NULL,
    MODIFY `paragraph` VARCHAR(10000) NOT NULL;
