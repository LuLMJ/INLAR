import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Delete,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { DeleteDoadorById } from 'src/inlar/actions/beneficiario/delete-beneficiario';
  
  const squema = z.object({
    id_doador: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/beneficiario/:id_beneficiario')
  export class DeleteBeneficiarioByIdController {
    constructor(private deleteBeneficiarioById: DeleteBeneficiarioById) {}
  
    @Delete()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const beneficiario = await this.deleteBeneficiarioById.execute({
        idBeneficiario: param.id_beneficiario,
      });
      console.log(beneficiario)
      if (beneficiario) {
        return beneficiario;
      }
  
      return new BadRequestException('Beneficiario not found');
    }
  }
  