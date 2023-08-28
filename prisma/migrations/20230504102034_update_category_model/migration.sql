/*
  Warnings:

  - You are about to drop the column `postId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_postId_fkey`;

-- DropIndex
DROP INDEX `Category_postId_id_idx` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `postId`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `category`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX `Post_categoryId_id_idx` ON `Post`(`categoryId`, `id`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
