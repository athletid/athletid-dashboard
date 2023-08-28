/*
  Warnings:

  - You are about to alter the column `status` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `roles`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'EDITOR';
