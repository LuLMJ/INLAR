import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Get,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { GettipoDoacaoById } from 'src/inlar/actions/tipoDoacao/get-tipoDoacao-by-id';
  
  const squema = z.object({
    id_tipoDoacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/tipoDoacao/:id_tipoDoacao')
  export class GettipoDoacaooByIdController {
    constructor(private gettipoDoacaoById: GettipoDoacaoById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const tipoDoacao = await this.gettipoDoacaoById.execute({
        idtipoDoacao: param.id_tipoDoacao,
      });
  
      if (tipoDoacao) {
        return tipoDoacao;
      }
  
      return new BadRequestException('tipoDoacao not found');
    }
  }
  