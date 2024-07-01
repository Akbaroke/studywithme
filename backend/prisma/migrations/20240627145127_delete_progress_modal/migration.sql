/*
  Warnings:

  - You are about to drop the `tb_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_progress` DROP FOREIGN KEY `tb_progress_id_content_fkey`;

-- DropForeignKey
ALTER TABLE `tb_progress` DROP FOREIGN KEY `tb_progress_id_user_fkey`;

-- DropTable
DROP TABLE `tb_progress`;
