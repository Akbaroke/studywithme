/*
  Warnings:

  - A unique constraint covering the columns `[id_question]` on the table `tb_detail_content` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `tb_questions` (
    `id` VARCHAR(255) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `id_answer` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tb_detail_content_id_question_key` ON `tb_detail_content`(`id_question`);

-- AddForeignKey
ALTER TABLE `tb_detail_content` ADD CONSTRAINT `tb_detail_content_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `tb_questions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
