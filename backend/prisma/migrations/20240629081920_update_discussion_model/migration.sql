-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_replies_discussion_fkey` FOREIGN KEY (`id_replies_discussion`) REFERENCES `tb_discussions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
