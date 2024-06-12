import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
  } from '@nestjs/common';
  
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { DeleteDoadorById } from 'src/inlar/actions/usuarios/delete-usuario';
import { Usuario } from 'src/inlar/entities/usuario';
  
  const squema = z.object({
    id_usuario: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/usuarios/:id_usuario')
  export class DeleteUsuarioByIdController {
    constructor(private deleteUsuarioById: DeleteUsuarioById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const usuario = await this.deleteUsuarioById.execute({
        idUsuario: param.id_usuario,
      });
      console.log(Usuario)
      if (usuario) {
        return usuario;
      }
  
      return new BadRequestException('Usuario not found');
    }
  }
  