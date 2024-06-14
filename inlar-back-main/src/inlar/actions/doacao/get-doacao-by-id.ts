import { Injectable } from '@nestjs/common';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';

interface Request {
  idDoacao: number;
}

@Injectable()
export class GetDoacaoById {
  constructor(private doacaoRepositorio: DoacaoRepositorio) {}

  async execute(data: Request): Promise<Doacao | null> {
    const res = await this.doacaoRepositorio.findById(data.idDoacao);
    
    if (res) {
      return res;
    }

    return null;
  }
}
