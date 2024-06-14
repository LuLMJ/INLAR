import { Injectable } from '@nestjs/common';
import { TipoDoacaoRepositorio } from 'src/inlar/database/prisma/repositories/tipo-doacao-repositorio';
import { TipoDoacao } from 'src/inlar/entities/tipoDoacao';

interface Request {
  descricao: string;
}

@Injectable()
export class CreateTipoDoacao {
  constructor(private tipoDoacaoRepositorio: TipoDoacaoRepositorio) {}

  async execute(data: Request): Promise<TipoDoacao | null> {
    const usuario = new TipoDoacao({
     descricao: data.descricao,
     ativo: true,
     dataCadastro: new Date(),
    });

    try {
      const res = await this.tipoDoacaoRepositorio.create(usuario);

      return res;
    } catch (error) {
      return null;
    }
  }
}
