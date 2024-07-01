-- DropForeignKey
ALTER TABLE `tb_discussions` DROP FOREIGN KEY `tb_discussions_id_detail_content_fkey`;

-- CreateTable
CREATE TABLE `tb_history_question` (
    `id` VARCHAR(255) NOT NULL,
    `id_detail_content` VARCHAR(255) NOT NULL,
    `result_score` INTEGER NULL DEFAULT 0,
    `target_score` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_detail_content_fkey` FOREIGN KEY (`id_detail_content`) REFERENCES `tb_detail_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_history_question` ADD CONSTRAINT `tb_history_question_id_detail_content_fkey` FOREIGN KEY (`id_detail_content`) REFERENCES `tb_detail_content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
