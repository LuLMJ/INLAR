// import {
//     Controller,
//     HttpCode,
//     BadRequestException,
//     Get,
//     Query,
//   } from '@nestjs/common';
  
//   import { z } from 'zod';
//   import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
//   import { GettipoDoacaoByPage } from 'src/inlar/actions/tipoDoacao/get-tipoDoacao-by-page';
  
//   const squema = z.object({
//     page: z.coerce.number(),
//   });
  
//   type Schema = z.infer<typeof squema>;
//   const validationPipe = new ZodValidationPipe(squema);
  
//   @Controller('/tipoDoacao')
//   export class GettipoDoacaoByPageController {
//     constructor(private gettipoDoacaoByPage: GettipoDoacaoByPage) {}
  
//     @Get()
//     @HttpCode(200)
//     async handle(
//       @Query(validationPipe)
//       query: Schema,
//     ) {
//       const tipoDoacao = await this.gettipoDoacaoByPage.execute({
//         page: query.page,
//       });
  
//       return tipoDoacao
//     }
//   }
  