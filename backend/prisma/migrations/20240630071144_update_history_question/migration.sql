/*
  Warnings:

  - A unique constraint covering the columns `[id_user]` on the table `tb_history_question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `tb_history_question` DROP FOREIGN KEY `tb_history_question_id_user_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `tb_history_question_id_user_key` ON `tb_history_question`(`id_user`);

-- AddForeignKey
ALTER TABLE `tb_history_question` ADD CONSTRAINT `tb_history_question_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
