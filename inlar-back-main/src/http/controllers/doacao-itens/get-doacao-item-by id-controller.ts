import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Get,
    NotFoundException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoacaoItemById } from 'src/inlar/actions/doacao-itens/get-doacao-item-by-id';
  
  const squema = z.object({
    id_doacao_item: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItem/:id_doacao_item')
  export class GetDoacaoItemByIdController {
    constructor(private getDoacaoItemById: GetDoacaoItemById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const doador = await this.getDoacaoItemById.execute({
        id: param.id_doacao_item,
      });
  
      if (doador) {
        return doador;
      }
  
      throw new NotFoundException('Doacao item not found');
    }
  }
  