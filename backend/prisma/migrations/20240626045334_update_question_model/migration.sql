/*
  Warnings:

  - You are about to drop the column `score` on the `tb_detail_content_question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_detail_content_question` DROP COLUMN `score`;

-- AlterTable
ALTER TABLE `tb_questions` ADD COLUMN `score` INTEGER NULL DEFAULT 0;
