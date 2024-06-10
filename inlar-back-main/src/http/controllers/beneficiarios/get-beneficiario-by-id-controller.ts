import {
    Controller,
    HttpCode,
    BadRequestException,
    Param,
    Get,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { GetBeneficiarioById } from 'src/inlar/actions/beneficiario/get-beneficiario-by-id';
  
  const squema = z.object({
    id_beneficiario: z.coerce.number(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/beneficiario/:id_beneficiario')
  export class GetBeneficiarioByIdController {
    constructor(private getBeneficiarioById: GetBeneficiarioById) {}
  
    @Get()
    @HttpCode(200)
    async handle(
      @Param(validationPipe)
      param: Schema,
    ) {
      const beneficiario = await this.getBeneficiarioById.execute({
        idBeneficiario: param.id_beneficiario,
      });
  
      if (beneficiario) {
        return beneficiario;
      }
  
      return new BadRequestException('Beneficiario not found');
    }
  }
  