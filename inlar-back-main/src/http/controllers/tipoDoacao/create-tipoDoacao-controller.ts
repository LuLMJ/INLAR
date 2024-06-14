import {
    Controller,
    Post,
    Body,
    HttpCode,
    BadRequestException,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { CreateTipoDoacao } from 'src/inlar/actions/tipo-doacao/create-tipo-doacao';
  
  const squema = z.object({
    descricao: z.string(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/tipoDoacao')
  export class CreatetipoDoacaoController {
    constructor(private createtipoDoacao: CreateTipoDoacao) {}
  
    @Post()
    @HttpCode(201)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {
      const tipoDoacao = await this.createtipoDoacao.execute({
        descricao: body.descricao,
      });
  
      if (tipoDoacao) {
        return tipoDoacao;
      }
  
      throw new BadRequestException;
    }
  }
  