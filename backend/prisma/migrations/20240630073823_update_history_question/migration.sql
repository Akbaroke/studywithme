-- DropIndex
DROP INDEX `tb_history_question_id_detail_content_key` ON `tb_history_question`;

-- DropIndex
DROP INDEX `tb_history_question_id_user_key` ON `tb_history_question`;

-- AddForeignKey
ALTER TABLE `tb_history_question` ADD CONSTRAINT `tb_history_question_id_detail_content_fkey` FOREIGN KEY (`id_detail_content`) REFERENCES `tb_detail_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
