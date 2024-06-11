import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';

interface Request {
  idEmpresa: number;
}

@Injectable()
export class DeleteEmpresa {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<boolean | null> {

    const empresaExists = await this.empresaRepositorio.findById(data.idEmpresa)

    if(!empresaExists) {
      return null
    }
  
    try {
      const res = await this.empresaRepositorio.delete(data.idEmpresa);

      return res;
    } catch (error) {
      return false;
    }
  }
}
