import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';

import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateUsuario } from 'src/inlar/actions/usuarios/create-usuario';

const squema = z.object({
  usuario: z.string(),
  email: z.string().email(),
  senha: z.string(),
});

type Schema = z.infer<typeof squema>;
const validationPipe = new ZodValidationPipe(squema);

@Controller('/usuarios')
export class CreateUsuarioController {
  constructor(private createUsuario: CreateUsuario) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(validationPipe)
    body: Schema,
  ) {
    const usuario = await this.createUsuario.execute({
      email: body.email,
      senha: body.senha,
      usuario: body.usuario,
    });

    if (usuario) {
      return usuario;
    }

    throw new BadRequestException;
  }
}
