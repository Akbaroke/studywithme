-- DropForeignKey
ALTER TABLE `tb_detail_content` DROP FOREIGN KEY `tb_detail_content_id_content_fkey`;

-- AddForeignKey
ALTER TABLE `tb_detail_content` ADD CONSTRAINT `tb_detail_content_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `tb_contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
