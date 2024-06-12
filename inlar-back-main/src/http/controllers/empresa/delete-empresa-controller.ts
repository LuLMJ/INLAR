import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
  } from '@nestjs/common';
  
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { DeleteDoadorById } from 'src/inlar/actions/empresa/delete-empresa';
  
  const squema = z.object({
    id_empresa: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa/:id_empresa')
  export class DeleteEmpresaByIdController {
    constructor(private deleteEmpresaById: DeleteEmpresaById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const empresa = await this.deleteEmpresaById.execute({
        idEmpresa: param.id_empresa,
      });
      console.log(empresa)
      if (empresa) {
        return empresa;
      }
  
      return new BadRequestException('Empresa not found');
    }
  }
  