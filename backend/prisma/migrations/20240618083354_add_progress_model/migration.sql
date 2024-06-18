-- CreateTable
CREATE TABLE `tb_progress` (
    `id` VARCHAR(255) NOT NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `id_content` VARCHAR(255) NOT NULL,
    `total_content_done` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_progress` ADD CONSTRAINT `tb_progress_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_progress` ADD CONSTRAINT `tb_progress_id_content_fkey` FOREIGN KEY (`id_content`) REFERENCES `tb_contents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
