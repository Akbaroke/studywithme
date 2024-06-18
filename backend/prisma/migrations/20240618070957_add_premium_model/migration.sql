-- CreateTable
CREATE TABLE `tb_premium` (
    `id` VARCHAR(255) NOT NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `start_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expired_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_premium` ADD CONSTRAINT `tb_premium_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
