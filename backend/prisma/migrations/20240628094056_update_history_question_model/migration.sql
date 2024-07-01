/*
  Warnings:

  - A unique constraint covering the columns `[id_detail_content]` on the table `tb_history_question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tb_history_question_id_detail_content_key` ON `tb_history_question`(`id_detail_content`);
