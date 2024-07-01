/*
  Warnings:

  - You are about to drop the column `score` on the `tb_questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_detail_content_question` ADD COLUMN `score` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `tb_questions` DROP COLUMN `score`;
