-- CreateTable
CREATE TABLE `tb_content_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_content` VARCHAR(255) NOT NULL,
    `id_category` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_content_category` ADD CONSTRAINT `tb_content_category_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `tb_contents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_content_category` ADD CONSTRAINT `tb_content_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
