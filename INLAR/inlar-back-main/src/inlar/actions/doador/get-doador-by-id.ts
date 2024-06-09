import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';

interface Request {
  idDoador: number;
}

@Injectable()
export class GetDoadorById {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador | null> {
    const res = await this.doadorRepositorio.findById(data.idDoador);

    if (res) {
      return res;
    }

    return null;
  }
}
