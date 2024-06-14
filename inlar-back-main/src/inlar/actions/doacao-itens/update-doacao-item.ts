import { Injectable } from '@nestjs/common';
import { DoacaoItensRepositorio } from 'src/inlar/database/prisma/repositories/doacao-itens-repositorio';
import { DoacaoItem } from 'src/inlar/entities/doacao-itens';

interface Request {
  id: number;
  tipo?: number
  numItens?: number
  quantidade?: number
  valor?: number
  descricao?: string
}

@Injectable()
export class UpdateDoacaoItem {
  constructor(
    private doacaoItensRepositorio: DoacaoItensRepositorio,
) {}

  async execute(data: Request): Promise<DoacaoItem | null> {
    const doacaoItemExists = await this.doacaoItensRepositorio.findById(data.id);

    if (!doacaoItemExists) {
      return null;
    }

    doacaoItemExists.setDescricao(data.descricao)
    doacaoItemExists.setQuantidade(data.quantidade)
    doacaoItemExists.setValor(data.valor)
    doacaoItemExists.setNumItens(data.numItens)

    try {
        const res = await this.doacaoItensRepositorio.update(data.id, doacaoItemExists)

        return res
    } catch (error) {
        return null;
    }
  }
}
