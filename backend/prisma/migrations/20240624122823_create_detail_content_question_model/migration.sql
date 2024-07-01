/*
  Warnings:

  - You are about to drop the column `id_question` on the `tb_detail_content` table. All the data in the column will be lost.
  - You are about to drop the `tb_score_question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_detail_content` DROP FOREIGN KEY `tb_detail_content_id_question_fkey`;

-- DropForeignKey
ALTER TABLE `tb_score_question` DROP FOREIGN KEY `tb_score_question_id_question_fkey`;

-- DropForeignKey
ALTER TABLE `tb_score_question` DROP FOREIGN KEY `tb_score_question_id_user_fkey`;

-- AlterTable
ALTER TABLE `tb_detail_content` DROP COLUMN `id_question`;

-- AlterTable
ALTER TABLE `tb_progress` ADD COLUMN `final_score` INTEGER NULL DEFAULT 0,
    MODIFY `total_content_done` INTEGER NULL DEFAULT 0;

-- DropTable
DROP TABLE `tb_score_question`;

-- CreateTable
CREATE TABLE `tb_detail_content_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_detail_content` VARCHAR(255) NOT NULL,
    `id_question` VARCHAR(255) NOT NULL,
    `score` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_detail_content_question` ADD CONSTRAINT `tb_detail_content_question_id_detail_content_fkey` FOREIGN KEY (`id_detail_content`) REFERENCES `tb_detail_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_content_question` ADD CONSTRAINT `tb_detail_content_question_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `tb_questions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
