/*
  Warnings:

  - You are about to alter the column `role` on the `tb_users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `tb_users` MODIFY `role` ENUM('ADMIN', 'STUDENT', 'THEACHER') NOT NULL;
