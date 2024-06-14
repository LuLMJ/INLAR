import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';

interface Request {
  idDoacao: number;
}

@Injectable()
export class GetDoacoesItensByDoacaoId {
  constructor(private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<DoacaoItem[] | null> {
    const res = await this.doacaoItensRepositorio.findManyByDoacaoId(data.idDoacao);

    if (res) {
      return res;
    }

    return null;
  }
}
