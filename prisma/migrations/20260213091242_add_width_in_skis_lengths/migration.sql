/*
  Warnings:

  - You are about to drop the column `tail_width` on the `specifications` table. All the data in the column will be lost.
  - You are about to drop the column `tip_width` on the `specifications` table. All the data in the column will be lost.
  - You are about to drop the column `waist_width` on the `specifications` table. All the data in the column will be lost.
  - Added the required column `tail_width` to the `skis_lengths` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tip_width` to the `skis_lengths` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waist_width` to the `skis_lengths` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `skis_lengths` ADD COLUMN `tail_width` DOUBLE NOT NULL,
    ADD COLUMN `tip_width` DOUBLE NOT NULL,
    ADD COLUMN `waist_width` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `specifications` DROP COLUMN `tail_width`,
    DROP COLUMN `tip_width`,
    DROP COLUMN `waist_width`;
