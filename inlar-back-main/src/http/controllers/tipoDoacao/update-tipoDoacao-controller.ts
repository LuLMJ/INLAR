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
   import { UpdatetipoDoacao } from 'src/inlar/actions/tipo-doacao/update-tipo-doacao';
   
   const squema = z.object({
     descricao: z.string().optional(),
     ativo: z.boolean().optional(),
   });

   type Schema = z.infer<typeof squema>;

   const validationPipe = new ZodValidationPipe(squema);

   const squemaParam = z.object({
     id_tipoDoacao: z.coerce.number(),
   });

   type SchemaParam = z.infer<typeof squemaParam>;
   const paramValidationPipe = new ZodValidationPipe(squemaParam);
   @Controller('/tipoDoacao/:id_tipoDoacao')
   export class UpdatetipoDoacaoController {
     constructor(private updatetipoDoacao: UpdatetipoDoacao) {}
     @Put()
     @HttpCode(200)
     async handle(
       @Param(paramValidationPipe)
       param: SchemaParam,
       @Body(validationPipe)
       body: Schema,
     ) {
       const tipoDoacao = await this.updatetipoDoacao.execute({
         id: param.id_tipoDoacao,
         descricao: body.descricao,
         ativo: body.ativo,
       });

       if (tipoDoacao) {
         return tipoDoacao;
       }
       throw new BadRequestException;
     }
   }
  