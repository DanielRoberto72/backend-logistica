-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `idNivel` VARCHAR(191) NOT NULL,
    `isLogged` INTEGER NOT NULL DEFAULT 0,
    `isMfa` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nivel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mfa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coMfa` VARCHAR(191) NOT NULL,
    `dtExpiracao` DATETIME(3) NOT NULL,
    `isValid` INTEGER NOT NULL DEFAULT 0,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enviosFisicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idMvno` VARCHAR(191) NOT NULL,
    `idCanal` VARCHAR(191) NOT NULL,
    `numPedido` INTEGER NOT NULL DEFAULT 0,
    `produto` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `dtPedido` DATETIME(3) NOT NULL,
    `dtEnvio` DATETIME(3) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `codPostal` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `codRastreio` VARCHAR(191) NOT NULL,
    `jsonIccid` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enviosVirtuais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idMvno` VARCHAR(191) NOT NULL,
    `idCanal` DATETIME(3) NOT NULL,
    `numPedido` INTEGER NOT NULL DEFAULT 0,
    `quantidade` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `dtPedido` DATETIME(3) NOT NULL,
    `dtEnvio` DATETIME(3) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `codRastreio` VARCHAR(191) NOT NULL,
    `nuIccid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canais` (
    `idCanal` INTEGER NOT NULL AUTO_INCREMENT,
    `noCanal` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCanal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mvno` (
    `idMvno` INTEGER NOT NULL AUTO_INCREMENT,
    `noMvno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idMvno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
