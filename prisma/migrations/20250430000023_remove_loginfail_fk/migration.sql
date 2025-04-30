-- DropForeignKey
ALTER TABLE `loginfaillog` DROP FOREIGN KEY `LoginFailLog_userId_fkey`;

-- DropIndex
DROP INDEX `LoginFailLog_userId_fkey` ON `loginfaillog`;
