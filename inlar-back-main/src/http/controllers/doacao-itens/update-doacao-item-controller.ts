import {
    Controller,
    Body,
    HttpCode,
    BadRequestException,
    Put,
    Param,
  } from '@nestjs/common';
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { UpdateDoacaoItem } from 'src/inlar/actions/doacao-itens/update-doacao-item';
  
  const squema = z.object({
    tipo: z.coerce.number().optional(),
    numItens: z.number().optional(),
    quantidade: z.number().optional(),
    valor: z.number().optional(),
    descricao: z.string().optional(),
  })
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  const squemaParam = z.object({
    id_doacao_item: z.coerce.number(),
  });
  
  type SchemaParam = z.infer<typeof squemaParam>;
  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  
  @Controller('/doacaoItem/:id_doacao_item')
  export class UpdateDoacaoItemController {
    constructor(private updateDoacaoItem: UpdateDoacaoItem) {}
  
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const empresa = await this.updateDoacaoItem.execute({
        id: param.id_doacao_item,
        descricao: body.descricao,
        numItens: body.numItens,
        quantidade: body.quantidade,
        valor: body.valor,
        tipo: body.tipo,
      });
  
      if (empresa) {
        return empresa;
      }
  
      throw new BadRequestException();
    }
  }
  