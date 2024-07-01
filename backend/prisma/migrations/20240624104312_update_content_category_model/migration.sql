-- DropForeignKey
ALTER TABLE `tb_content_category` DROP FOREIGN KEY `tb_content_category_id_category_fkey`;

-- DropForeignKey
ALTER TABLE `tb_content_category` DROP FOREIGN KEY `tb_content_category_id_content_fkey`;

-- AddForeignKey
ALTER TABLE `tb_content_category` ADD CONSTRAINT `tb_content_category_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `tb_contents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_content_category` ADD CONSTRAINT `tb_content_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tb_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
