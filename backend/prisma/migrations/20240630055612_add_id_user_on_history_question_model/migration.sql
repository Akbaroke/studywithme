/*
  Warnings:

  - Added the required column `id_user` to the `tb_history_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_history_question` ADD COLUMN `id_user` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `tb_history_question` ADD CONSTRAINT `tb_history_question_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
