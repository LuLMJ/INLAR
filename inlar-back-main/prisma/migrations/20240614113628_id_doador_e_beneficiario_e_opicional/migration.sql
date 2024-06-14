-- DropForeignKey
ALTER TABLE `doacao` DROP FOREIGN KEY `doacao_IDBENEFICIARIO_fkey`;

-- DropForeignKey
ALTER TABLE `doacao` DROP FOREIGN KEY `doacao_IDDOADOR_fkey`;

-- AlterTable
ALTER TABLE `doacao` MODIFY `IDDOADOR` INTEGER NULL,
    MODIFY `IDBENEFICIARIO` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `doacao` ADD CONSTRAINT `doacao_IDDOADOR_fkey` FOREIGN KEY (`IDDOADOR`) REFERENCES `doador`(`IDDOADOR`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doacao` ADD CONSTRAINT `doacao_IDBENEFICIARIO_fkey` FOREIGN KEY (`IDBENEFICIARIO`) REFERENCES `beneficiario`(`IDBENEFICIARIO`) ON DELETE SET NULL ON UPDATE CASCADE;