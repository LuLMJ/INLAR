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
  import { UpdatetipoDoacao } from 'src/inlar/actions/usuarios/update-usuario';
  
  const squema = z.object({
    descricao: z.string(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  const squemaParam = z.object({
    id_usuario: z.coerce.number(),
  });
  
  type SchemaParam = z.infer<typeof squemaParam>;
  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  
  @Controller('/usuario/:id_usuario')
  export class UpdateUsuarioController {
    constructor(private updateUsuario: UpdateUsuario) {}
  
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const usuario = await this.UpdateUsuario.execute({
        descricao: body.descricao,
      });
  
      if (usuario) {
        return usuario;
      }
  
      return new BadRequestException();
    }
  }