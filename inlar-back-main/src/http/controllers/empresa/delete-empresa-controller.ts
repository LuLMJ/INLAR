import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { DeleteEmpresa } from 'src/inlar/actions/empresa/delete-empresa';
  
  const squema = z.object({
    id_empresa: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/empresa/:id_empresa')
  export class DeleteEmmpresaController {
    constructor(private deleteEmpresaById: DeleteEmpresa) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const empresa = await this.deleteEmpresaById.execute({
        idEmpresa: param.id_empresa,
      });
  
      if (empresa) {
        return empresa;
      }
  
      throw new BadRequestException();
    }
  }
  