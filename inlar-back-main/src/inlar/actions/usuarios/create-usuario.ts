import { Injectable } from '@nestjs/common';
import { UsuarioRepositorio } from 'src/inlar/database/prisma/repositories/usuario-repositorio';
import { Usuario } from 'src/inlar/entities/usuario';

interface Request {
  usuario: string;
  email: string;
  senha: string;
}

@Injectable()
export class CreateUsuario {
  constructor(private usuarioRepositorio: UsuarioRepositorio) {}

  async execute(data: Request): Promise<Usuario | null> {
    const usuario = new Usuario({
      usuario: data.usuario,
      email: data.email,
      senha: data.senha,
      role: 'U',
      dataCadastro: new Date(),
      ativo: true,
    });

    try {
      const res = await this.usuarioRepositorio.create(usuario);

      return res;
    } catch (error) {
      return null;
    }
  }
}
