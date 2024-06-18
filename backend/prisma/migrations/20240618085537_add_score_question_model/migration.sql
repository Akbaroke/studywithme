-- CreateTable
CREATE TABLE `tb_score_question` (
    `id` VARCHAR(255) NOT NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `id_question` VARCHAR(255) NOT NULL,
    `score` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_score_question` ADD CONSTRAINT `tb_score_question_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_score_question` ADD CONSTRAINT `tb_score_question_id_question_fkey` FOREIGN KEY (`id_question`) REFERENCES `tb_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
