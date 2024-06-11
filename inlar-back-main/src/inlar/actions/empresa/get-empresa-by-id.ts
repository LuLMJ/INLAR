import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';

interface Request {
  idEmpresa: number
}

@Injectable()
export class GetEmpresaById {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<Empresa | null> {
    const res = await this.empresaRepositorio.findById(data.idEmpresa)

    if(res) {
        return res
    }

    return null
  }
}
