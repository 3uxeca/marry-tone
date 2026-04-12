CREATE TABLE `User` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `displayName` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  UNIQUE INDEX `User_email_key`(`email`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DiagnosisSession` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` ENUM('PERSONAL_COLOR', 'BODY_MEASUREMENTS', 'SKELETON_TYPE') NOT NULL,
  `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `inputObjectKey` VARCHAR(512) NULL,
  `result` JSON NULL,
  `confidence` DOUBLE NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  INDEX `DiagnosisSession_userId_createdAt_idx`(`userId`, `createdAt`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `StyleCard` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `payload` JSON NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  INDEX `StyleCard_userId_category_idx`(`userId`, `category`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ComparisonSet` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `status` ENUM('DRAFT', 'FINALIZED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  INDEX `ComparisonSet_userId_status_idx`(`userId`, `status`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ComparisonSetItem` (
  `id` VARCHAR(191) NOT NULL,
  `comparisonSetId` VARCHAR(191) NOT NULL,
  `styleCardId` VARCHAR(191) NOT NULL,
  `rank` INTEGER NULL,
  `note` VARCHAR(512) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  UNIQUE INDEX `ComparisonSetItem_comparisonSetId_styleCardId_key`(`comparisonSetId`, `styleCardId`),
  INDEX `ComparisonSetItem_styleCardId_idx`(`styleCardId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DecisionEvent` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `comparisonSetId` VARCHAR(191) NULL,
  `diagnosisSessionId` VARCHAR(191) NULL,
  `eventType` ENUM('SAVED', 'COMPARED', 'FINAL_SELECTED', 'DISMISSED') NOT NULL,
  `payload` JSON NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  INDEX `DecisionEvent_userId_createdAt_idx`(`userId`, `createdAt`),
  INDEX `DecisionEvent_comparisonSetId_idx`(`comparisonSetId`),
  INDEX `DecisionEvent_diagnosisSessionId_idx`(`diagnosisSessionId`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `DiagnosisSession`
  ADD CONSTRAINT `DiagnosisSession_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `StyleCard`
  ADD CONSTRAINT `StyleCard_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ComparisonSet`
  ADD CONSTRAINT `ComparisonSet_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ComparisonSetItem`
  ADD CONSTRAINT `ComparisonSetItem_comparisonSetId_fkey`
  FOREIGN KEY (`comparisonSetId`) REFERENCES `ComparisonSet`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ComparisonSetItem_styleCardId_fkey`
  FOREIGN KEY (`styleCardId`) REFERENCES `StyleCard`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `DecisionEvent`
  ADD CONSTRAINT `DecisionEvent_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `DecisionEvent_comparisonSetId_fkey`
  FOREIGN KEY (`comparisonSetId`) REFERENCES `ComparisonSet`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `DecisionEvent_diagnosisSessionId_fkey`
  FOREIGN KEY (`diagnosisSessionId`) REFERENCES `DiagnosisSession`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;
