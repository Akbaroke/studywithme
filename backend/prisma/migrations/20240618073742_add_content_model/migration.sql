-- CreateTable
CREATE TABLE `tb_contents` (
    `id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `thumbnail` VARCHAR(255) NULL,
    `is_premium` BOOLEAN NOT NULL,
    `total_duration` INTEGER NOT NULL,
    `total_klik` INTEGER NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_contents` ADD CONSTRAINT `tb_contents_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_contents` ADD CONSTRAINT `tb_contents_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
