import {
  Controller,
  HttpCode,
  BadRequestException,
  Param,
  Get,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetDoadorById } from 'src/inlar/actions/doador/get-doador-by-id';

const squema = z.object({
  id_doador: z.coerce.number(),
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

@Controller('/doador/:id_doador')
export class GetDoadorByIdController {
  constructor(private getDoadorById: GetDoadorById) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(validationPipe)
    param: Schema,
  ) {
    const doador = await this.getDoadorById.execute({
      idDoador: param.id_doador,
    });

    if (doador) {
      return doador;
    }

    return new BadRequestException('Doador not found');
  }
}
