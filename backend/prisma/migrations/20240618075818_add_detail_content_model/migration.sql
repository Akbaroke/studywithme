-- CreateTable
CREATE TABLE `tb_detail_content` (
    `id` VARCHAR(255) NOT NULL,
    `id_content` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `is_premium` BOOLEAN NOT NULL,
    `duration` INTEGER NOT NULL,
    `video_url` VARCHAR(255) NULL,
    `id_question` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_detail_content_fkey` FOREIGN KEY (`id_detail_content`) REFERENCES `tb_detail_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_content` ADD CONSTRAINT `tb_detail_content_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_content` ADD CONSTRAINT `tb_detail_content_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_content` ADD CONSTRAINT `tb_detail_content_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `tb_contents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
