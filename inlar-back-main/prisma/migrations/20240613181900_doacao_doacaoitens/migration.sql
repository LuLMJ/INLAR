-- CreateTable
CREATE TABLE `doacao` (
    `IDDOACAO` INTEGER NOT NULL AUTO_INCREMENT,
    `IDDOADOR` INTEGER NOT NULL,
    `IDBENEFICIARIO` INTEGER NOT NULL,
    `IDUSUARIO` INTEGER NOT NULL,
    `DESCRICAO` VARCHAR(100) NOT NULL,
    `DATACAD` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CEP` VARCHAR(11) NULL,
    `LOGRADOURO` VARCHAR(255) NULL,
    `NUMERO` VARCHAR(10) NULL,
    `COMPLEMENTO` VARCHAR(100) NULL,
    `BAIRRO` VARCHAR(100) NULL,
    `CIDADE` VARCHAR(100) NULL,
    `SIGLAESTADO` VARCHAR(2) NULL,
    `SITUACAO` VARCHAR(191) NOT NULL DEFAULT 'S',

    PRIMARY KEY (`IDDOACAO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doacaoItens` (
    `IDITEMDOACAO` INTEGER NOT NULL AUTO_INCREMENT,
    `IDDOACAO` INTEGER NOT NULL,
    `IDTIPODOACAO` INTEGER NOT NULL,
    `NUMITEM` INTEGER NOT NULL,
    `DESCRICAO` VARCHAR(255) NULL,
    `QTDE` INTEGER NULL,
    `VALORMONETARIO` DECIMAL(10, 2) NOT NULL,
    `DATACAD` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`IDITEMDOACAO`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `doacao` ADD CONSTRAINT `doacao_IDDOADOR_fkey` FOREIGN KEY (`IDDOADOR`) REFERENCES `doador`(`IDDOADOR`) ON DELETE RESTRICT ON UPDATE CASCADE; 

-- AddForeignKey
ALTER TABLE `doacao` ADD CONSTRAINT `doacao_IDBENEFICIARIO_fkey` FOREIGN KEY (`IDBENEFICIARIO`) REFERENCES `beneficiario`(`IDBENEFICIARIO`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doacao` ADD CONSTRAINT `doacao_IDUSUARIO_fkey` FOREIGN KEY (`IDUSUARIO`) REFERENCES `usuario`(`IDUSUARIO`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `doacaoItens` ADD CONSTRAINT `doacaoItens_IDDOACAO_fkey` FOREIGN KEY (`IDDOACAO`) REFERENCES `doacao`(`IDDOACAO`) ON DELETE RESTRICT ON UPDATE CASCADE;  

-- AddForeignKey
ALTER TABLE `doacaoItens` ADD CONSTRAINT `doacaoItens_IDTIPODOACAO_fkey` FOREIGN KEY (`IDTIPODOACAO`) REFERENCES `tipodoacao`(`IDTIPODOACAO`) ON DELETE RESTRICT ON UPDATE CASCADE;