/*
  Warnings:

  - You are about to drop the column `id_answer` on the `tb_questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_options` ADD COLUMN `is_answer` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tb_questions` DROP COLUMN `id_answer`;
