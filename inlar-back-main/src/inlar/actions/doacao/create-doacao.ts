import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoRepositorio } from 'src/inlar/database/prisma/repositories/doacao-repositorio';
import { DoadorRepositorio } from 'src/inlar/database/prisma/repositories/doador-repositorio';
import { Doacao } from 'src/inlar/entities/doacao';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';
import { Doador } from 'src/inlar/entities/doador';

interface Request {
  descricao: string;
  cep?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  observacoes?: string | null;
  itens: {
    tipo: string
    numItens?: number
    quantidade?: number
    valor?: number
    descricao?: string
  }[]
}

@Injectable()
export class CreateDoacao {
  constructor(
    private doacaoRepositorio: DoacaoRepositorio,
    private doacaoItemRepositorio: DoacaoItensRepositorio
  ) {}

  async execute(data: Request): Promise<Doacao | null> {
    const doacao = new Doacao({
      descricao: data.descricao,
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
      dataCadastro: new Date(),
      situacao: "S",
    });

    let doacaoItens: DoacaoItem[] = [] 
    let createdDoacao: Doacao

    try {
        createdDoacao = await this.doacaoRepositorio.create(doacao);
    } catch (error) {
        return null
    }

    data.itens.map((item) => {
        doacaoItens.push(new DoacaoItem({
            idDoacao: createdDoacao.getIdDoacao(),
            descricao: item.descricao,
            quantidade: item.quantidade,
            valor: item.valor,
            numItems: item.numItens,
            dataCadastro: new Date()
        }))
    })

    try {
        await this.doacaoItemRepositorio.createMany(doacaoItens);
    } catch (error) {
        return null
    }

    return createdDoacao
  }
}
