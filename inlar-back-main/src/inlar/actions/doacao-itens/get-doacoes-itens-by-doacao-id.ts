import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';

interface Request {
  idDoacao: number;
}

@Injectable()
export class GetDoacoesItensByDoacaoId {
  constructor(
    private doacaoItensRepositorio: DoacaoItensRepositorio,
    private doacaoRepositorio: DoacaoRepositorio,
  ) {}

  async execute(data: Request): Promise<DoacaoItem[] | null> {
    const doacao = await this.doacaoRepositorio.findById(data.idDoacao);

    if (!doacao) {
      return null;
    }

    const res = await this.doacaoItensRepositorio.findManyByDoacaoId(data.idDoacao);

    if (res) {
      return res;
    }

    return null;
  }
}
