/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - The required column `undefined_category_id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `undefined_category_id` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'undefined',
    ADD PRIMARY KEY (`undefined_category_id`);

-- AlterTable
ALTER TABLE `Post` MODIFY `categoryId` VARCHAR(191) NOT NULL DEFAULT 'undefined_category_id';

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`undefined_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
