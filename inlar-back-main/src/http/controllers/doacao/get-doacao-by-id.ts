import {
    Controller,
    HttpCode,
    Param,
    Get,
    NotFoundException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoacaoById } from 'src/inlar/actions/doacao/get-doacao-by-id';
  
  const squema = z.object({
    id_doacao: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doacao/:id_doacao')
  export class GetDoacaoByIdController {
    constructor(private getDoacaoById: GetDoacaoById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const doacao = await this.getDoacaoById.execute({
        idDoacao: param.id_doacao,
      });
  
      if (doacao) {
        return doacao;
      }
  
      throw new NotFoundException('Empresa not found');
    }
  }
  