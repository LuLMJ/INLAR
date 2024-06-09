import { Injectable } from '@nestjs/common';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doador } from 'src/inlar/entities/doador';

interface Request {
  idDoador: number;
  nome: string;
  tipoPessoa: string;
  cpf?: string;
  cnpj?: string | null;
  contato1?: string | null;
  contato2?: string | null;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
}

@Injectable()
export class UpdateDoador {
  constructor(private doadorRepositorio: DoadorRepositorio) {}

  async execute(data: Request): Promise<Doador | null> {
    const doadorExists = await this.doadorRepositorio.findById(data.idDoador);

    if (!doadorExists) {
      return null;
    }

    doadorExists.setNome(data.nome);
    doadorExists.setTipoPessoa(data.tipoPessoa);
    doadorExists.setCpf(data.cpf);
    doadorExists.setCnpj(data.cnpj);
    doadorExists.setContato1(data.contato1);
    doadorExists.setContato2(data.contato2);
    doadorExists.setCep(data.cep);
    doadorExists.setLogradouro(data.logradouro);
    doadorExists.setNumero(data.numero);
    doadorExists.setComplemento(data.complemento);
    doadorExists.setBairro(data.bairro);
    doadorExists.setCidade(data.cidade);
    doadorExists.setUf(data.uf);
    doadorExists.setObservacoes(data.observacoes);

    try {
      const res = await this.doadorRepositorio.update(
        data.idDoador,
        doadorExists,
      );

      return res;
    } catch (error) {
      console.log('error: ', error);
      return null;
    }
  }
}
