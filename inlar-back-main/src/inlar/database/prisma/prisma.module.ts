import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsuarioRepositorio } from './repositories/usuario-repositorio';
import { DoadorRepositorio } from './repositories/doador-repositorio';

@Module({
  providers: [PrismaService, UsuarioRepositorio, DoadorRepositorio],
  exports: [UsuarioRepositorio, DoadorRepositorio],
})
export class PrismaModule {}
