import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { Doador } from 'src/inlar/entities/doador';

interface Request {
  page: number;
}

@Injectable()
export class GetDoacoesItensByPage {
  constructor(private doacaoItensRepositorio: DoacaoItensRepositorio) {}

  async execute(data: Request): Promise<DoacaoItem[]> {
    const res = await this.doacaoItensRepositorio.findMany(data.page);

    if (res) {
      return res;
    }

    return null;
  }
}
