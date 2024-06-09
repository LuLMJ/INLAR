import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';

interface Request {
  idDoador: number;
}

@Injectable()
export class DeleteDoadorById {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<boolean | null> {
    const res = await this.doadorRepositorio.findById(data.idDoador);

    if (!res) {
      return null;
    }
    const doador =  await this.doadorRepositorio.Delete(data.idDoador)
    if (doador) return doador
  }
}
