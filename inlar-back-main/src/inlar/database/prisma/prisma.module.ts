import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsuarioRepositorio } from './repositories/usuario-repositorio';
import { DoadorRepositorio } from './repositories/doador-repositorio';
import { EmpresaRepositorio } from "./repositories/empresa-repositorio";
@Module({
  providers: [PrismaService, UsuarioRepositorio, DoadorRepositorio, EmpresaRepositorio],
  exports: [UsuarioRepositorio, DoadorRepositorio, EmpresaRepositorio],
})
export class PrismaModule {}
