-- CreateTable
CREATE TABLE `Drone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `serialNo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'idle',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Drone_serialNo_key`(`serialNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DroneTelemetry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `droneId` INTEGER NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `altitude` DOUBLE NOT NULL,
    `speed` DOUBLE NOT NULL,
    `heading` DOUBLE NOT NULL,
    `batteryLevel` DOUBLE NOT NULL,
    `temperature` DOUBLE NULL,
    `humidity` DOUBLE NULL,
    `pressure` DOUBLE NULL,
    `satellites` INTEGER NULL,
    `signalStrength` DOUBLE NULL,
    `flightMode` VARCHAR(191) NOT NULL DEFAULT 'manual',
    `armed` BOOLEAN NOT NULL DEFAULT false,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `DroneTelemetry_droneId_idx`(`droneId`),
    INDEX `DroneTelemetry_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DroneTelemetry` ADD CONSTRAINT `DroneTelemetry_droneId_fkey` FOREIGN KEY (`droneId`) REFERENCES `Drone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
