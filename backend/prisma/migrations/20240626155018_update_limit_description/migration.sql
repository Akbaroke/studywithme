-- AlterTable
ALTER TABLE `tb_contents` MODIFY `description` VARCHAR(10000) NULL;

-- AlterTable
ALTER TABLE `tb_detail_content` MODIFY `description` VARCHAR(10000) NULL;

-- AlterTable
ALTER TABLE `tb_options` MODIFY `option` VARCHAR(5000) NOT NULL;

-- AlterTable
ALTER TABLE `tb_price` MODIFY `description` VARCHAR(10000) NULL;

-- AlterTable
ALTER TABLE `tb_questions` MODIFY `question` VARCHAR(10000) NOT NULL;
