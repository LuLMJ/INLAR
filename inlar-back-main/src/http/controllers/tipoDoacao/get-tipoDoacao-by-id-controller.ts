 import {
     Controller,
     HttpCode,
     Param,
     Get,
     NotFoundException,
   } from '@nestjs/common';
   import { z } from 'zod';
   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
   import { GetTipoDoacaoById } from 'src/inlar/actions/tipo-doacao/get-tipo-doacao-by-id';
   const squema = z.object({
     id_tipoDoacao: z.coerce.number(),
   });
   type Schema = z.infer<typeof squema>;
   const validationPipe = new ZodValidationPipe(squema);
   @Controller('/tipoDoacao/:id_tipoDoacao')
   export class GetTipoDoacaooByIdController {
     constructor(private getTipoDoacaoById: GetTipoDoacaoById) {}
     @Get()
     @HttpCode(200)
     async handle(
       @Param(validationPipe)
       param: Schema,
     ) {
       const tipoDoacao = await this.getTipoDoacaoById.execute({
         id: param.id_tipoDoacao,
       });
       if (tipoDoacao) {
         return tipoDoacao;
       }
       throw new NotFoundException('tipoDoacao not found');
     }
   }