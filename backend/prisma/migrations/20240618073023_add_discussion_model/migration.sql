-- CreateTable
CREATE TABLE `tb_discussions` (
    `id` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_replies_discussion` VARCHAR(255) NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `id_detail_content` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
