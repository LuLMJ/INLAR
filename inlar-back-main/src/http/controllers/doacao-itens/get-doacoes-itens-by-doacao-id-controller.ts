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
import { GetDoacoesItensByDoacaoId } from 'src/inlar/actions/doacao-itens/get-doacoes-itens-by-doacao-id';
  
  const squema = z.object({
    id_doacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacaoItem/doacao/:id_doacao')
  export class GetDoacaoItemByDoacaoIdController {
    constructor(
        private getDoacoesItensByDoacaoId: GetDoacoesItensByDoacaoId,
    ) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const doador = await this.getDoacoesItensByDoacaoId.execute({
        idDoacao: param.id_doacao,
      });
  
      console.log(doador)
      if (doador) {
        return doador;
      }
  
      throw new NotFoundException('Doacao item not found');
    }
  }
  