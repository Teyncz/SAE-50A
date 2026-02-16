-- CreateTable
CREATE TABLE `skis_lengths` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skiId` INTEGER NOT NULL,
    `length` DOUBLE NOT NULL,
    `radius` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `tail_width` DOUBLE NOT NULL,
    `tip_width` DOUBLE NOT NULL,
    `waist_width` DOUBLE NOT NULL,

    INDEX `skis_lengths_skiId_fkey`(`skiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skis_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skiId` INTEGER NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,

    INDEX `skis_images_skiId_fkey`(`skiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_skis` (
    `categoryId` INTEGER NOT NULL,
    `skiId` INTEGER NOT NULL,

    INDEX `categories_on_skis_skiId_fkey`(`skiId`),
    PRIMARY KEY (`categoryId`, `skiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors_on_skis` (
    `colorId` INTEGER NOT NULL,
    `skiId` INTEGER NOT NULL,

    UNIQUE INDEX `colors_on_skis_colorId_key`(`colorId`),
    INDEX `colors_on_skis_skiId_fkey`(`skiId`),
    PRIMARY KEY (`colorId`, `skiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hexaCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saisons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `saisonId` INTEGER NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `levelRequired` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `retailPrice` DOUBLE NOT NULL,
    `productUrl` VARCHAR(191) NOT NULL,
    `tumbnailUrl` VARCHAR(191) NOT NULL,

    INDEX `Skis_brandId_fkey`(`brandId`),
    INDEX `Skis_saisonId_fkey`(`saisonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `skiId` INTEGER NOT NULL,
    `handling` INTEGER NOT NULL,
    `stability` INTEGER NOT NULL,
    `pop` INTEGER NOT NULL,
    `float` INTEGER NOT NULL,

    UNIQUE INDEX `Specifications_skiId_key`(`skiId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skis_lengths` ADD CONSTRAINT `skis_lengths_skiId_fkey` FOREIGN KEY (`skiId`) REFERENCES `skis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skis_images` ADD CONSTRAINT `skis_images_skiId_fkey` FOREIGN KEY (`skiId`) REFERENCES `skis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_skis` ADD CONSTRAINT `categories_on_skis_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_skis` ADD CONSTRAINT `categories_on_skis_skiId_fkey` FOREIGN KEY (`skiId`) REFERENCES `skis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colors_on_skis` ADD CONSTRAINT `colors_on_skis_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `colors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `colors_on_skis` ADD CONSTRAINT `colors_on_skis_skiId_fkey` FOREIGN KEY (`skiId`) REFERENCES `skis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skis` ADD CONSTRAINT `Skis_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skis` ADD CONSTRAINT `Skis_saisonId_fkey` FOREIGN KEY (`saisonId`) REFERENCES `saisons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specifications` ADD CONSTRAINT `Specifications_skiId_fkey` FOREIGN KEY (`skiId`) REFERENCES `skis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
