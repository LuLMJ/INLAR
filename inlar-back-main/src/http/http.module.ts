import { Module } from '@nestjs/common';
import { CreateUsuario } from 'src/inlar/actions/usuarios/create-usuario';
import { PrismaModule } from 'src/inlar/database/prisma/prisma.module';
import { CreateUsuarioController } from './controllers/usuarios/create-usuario-controller';
import { CreateDoador } from 'src/inlar/actions/doador/create-doador';
import { GetDoadorById } from 'src/inlar/actions/doador/get-doador-by-id';
import { CreateDoadorController } from './controllers/doador/create-doador-controller';
import { GetDoadorByIdController } from './controllers/doador/get-doador-by-id-controller';
import { UpdateDoador } from 'src/inlar/actions/doador/update-doador';
import { UpdateDoadorController } from './controllers/doador/update-doador-controller';
import { GetDoadoresByPage } from 'src/inlar/actions/doador/get-doadores-by-page';
import { GetDoadoresByPageController } from './controllers/doador/get-doadores-by-page-controller';
import { DeleteDoadorById } from 'src/inlar/actions/doador/delete-doador';
import { DeleteDoadorByIdController } from './controllers/doador/delete-doador-by-id-controller';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUsuario,
    CreateDoador,
    GetDoadorById,
    UpdateDoador,
    GetDoadoresByPage,
    DeleteDoadorById,
  ],
  controllers: [
    CreateUsuarioController,
    CreateDoadorController,
    GetDoadorByIdController,
    UpdateDoadorController,
    GetDoadoresByPageController,
    DeleteDoadorByIdController,
  ],
})
export class HttpModule {}
