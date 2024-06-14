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
import { CreateEmpresa } from 'src/inlar/actions/empresa/create-empresa';
import { CreateEmpresaController } from './controllers/empresa/create-empresa-controller';
import { GetEmpresaByIdController } from './controllers/empresa/get-empresa-by-id-controller';
import { GetEmpresaById } from 'src/inlar/actions/empresa/get-empresa-by-id';
import { GetEmpresaByPageController } from './controllers/empresa/get-empresa-by-page-controller';
import { GetEmpresaByPage } from 'src/inlar/actions/empresa/get-empresa-by-page';
import { UpdateEmpresa } from 'src/inlar/actions/empresa/update-empresa';
import { UpdateEmpresaController } from './controllers/empresa/update-empresa-controller';
import { DeleteEmmpresaController } from './controllers/empresa/delete-empresa-controller';
import { DeleteEmpresa } from 'src/inlar/actions/empresa/delete-empresa';
import { AuthenticateUser } from 'src/inlar/actions/usuarios/authenticate-user';
import { AuthenticateUserController } from './controllers/usuarios/authenticate-user-controller';
import { CreateDoacaoController } from './controllers/doacao/create-doacao-controller';
import { CreateDoacao } from 'src/inlar/actions/doacao/create-doacao';
import { CreateTipoDoacao } from 'src/inlar/actions/tipo-doacao/create-tipo-doacao';
import { CreatetipoDoacaoController } from './controllers/tipoDoacao/create-tipoDoacao-controller';
import { GetDoacaoById } from 'src/inlar/actions/doacao/get-doacao-by-id';
import { GetDoacaoByIdController } from './controllers/doacao/get-doacao-by-id';
import { GetDoacoesByPageController } from './controllers/doacao/get-doacoes-by-page';
import { GetDoacaoByPage } from 'src/inlar/actions/doacao/get-doacoes-by-page';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUsuario,
    CreateDoador,
    GetDoadorById,
    UpdateDoador,
    GetDoadoresByPage,
    DeleteDoadorById,
    CreateEmpresa,
    GetEmpresaById,
    GetEmpresaByPage,
    UpdateEmpresa,
    DeleteEmpresa,
    AuthenticateUser,
    CreateDoacao,
    CreateTipoDoacao,
    GetDoacaoById,
    GetDoacaoByPage
  ],
  controllers: [
    CreateUsuarioController,
    CreateDoadorController,
    GetDoadorByIdController,
    UpdateDoadorController,
    GetDoadoresByPageController,
    DeleteDoadorByIdController,
    CreateEmpresaController,
    GetEmpresaByIdController,
    GetEmpresaByPageController,
    UpdateEmpresaController,
    DeleteEmmpresaController,
    AuthenticateUserController,
    CreateDoacaoController,
    CreatetipoDoacaoController,
    GetDoacaoByIdController,
    GetDoacoesByPageController
  ],
})
export class HttpModule {}
