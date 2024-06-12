import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { DeleteDoadorById } from 'src/inlar/actions/doador/delete-doador';
  
  const squema = z.object({
    id_doador: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/doador/:id_doador')
  export class DeleteDoadorByIdController {
    constructor(private deleteDoadorById: DeleteDoadorById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const doador = await this.deleteDoadorById.execute({
        idDoador: param.id_doador,
      });
      console.log(doador)
      if (doador) {
        return doador;
      }
  
      return new BadRequestException('Doador not found');
    }
  }
  