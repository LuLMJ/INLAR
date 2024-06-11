import { Injectable } from '@nestjs/common';
import { EmpresaRepositorio } from 'src/inlar/database/prisma/repositories/empresa-repositorio';
import { Empresa } from 'src/inlar/entities/empresa';

interface Request {
  idEmpresa: number;
  nomefantasia?: string;
  razaosocial?: string;
  cnpj?: string;
  cpf?: string
  contato1?: string;
  contato2?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

@Injectable()
export class UpdateEmpresa {
  constructor(private empresaRepositorio: EmpresaRepositorio) {}

  async execute(data: Request): Promise<Empresa | null> {

    const empresaExists = await this.empresaRepositorio.findById(data.idEmpresa)

    if(!empresaExists) {
      return null
    }
  
    empresaExists.setNomeFantasia(data.nomefantasia)
    empresaExists.setRazaoSocial(data.razaosocial)
    empresaExists.setCnpj(data.cnpj)
    empresaExists.setContato1(data.contato1)
    empresaExists.setContato2(data.contato2)
    empresaExists.setCep(data.cep)
    empresaExists.setLogradouro(data.logradouro)
    empresaExists.setNumero(data.numero)
    empresaExists.setComplemento(data.complemento)
    empresaExists.setBairro(data.bairro)
    empresaExists.setCidade(data.cidade)
    empresaExists.setUf(data.uf)


    try {
      const res = await this.empresaRepositorio.update(data.idEmpresa, empresaExists);

      return res;
    } catch (error) {
      return null;
    }
  }
}
