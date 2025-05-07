-- CreateTable
CREATE TABLE `LottoResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `round` INTEGER NOT NULL,
    `drawDate` DATETIME(3) NOT NULL,
    `firstWinners` INTEGER NOT NULL,
    `firstPrize` BIGINT NOT NULL,
    `secondWinners` INTEGER NOT NULL,
    `secondPrize` BIGINT NOT NULL,
    `thirdWinners` INTEGER NOT NULL,
    `thirdPrize` BIGINT NOT NULL,
    `fourthWinners` INTEGER NOT NULL,
    `fourthPrize` BIGINT NOT NULL,
    `fifthWinners` INTEGER NOT NULL,
    `fifthPrize` BIGINT NOT NULL,
    `number1` INTEGER NOT NULL,
    `number2` INTEGER NOT NULL,
    `number3` INTEGER NOT NULL,
    `number4` INTEGER NOT NULL,
    `number5` INTEGER NOT NULL,
    `number6` INTEGER NOT NULL,
    `bonusNumber` INTEGER NOT NULL,

    UNIQUE INDEX `LottoResult_round_key`(`round`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
