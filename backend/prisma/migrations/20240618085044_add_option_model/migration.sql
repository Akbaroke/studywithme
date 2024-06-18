-- CreateTable
CREATE TABLE `tb_options` (
    `id` VARCHAR(255) NOT NULL,
    `option` VARCHAR(255) NOT NULL,
    `id_question` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_options` ADD CONSTRAINT `tb_options_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `tb_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
