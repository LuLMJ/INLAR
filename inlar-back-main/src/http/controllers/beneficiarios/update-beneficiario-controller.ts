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
  import { UpdateBeneficiario } from 'src/inlar/actions/beneficiario/update-beneficiario';
  
  const squema = z.object({
    nome: z.string(),
    datanasc: z.coerce.date().optional(),
    tipo_pessoa: z.string(),
    genero: z.string().optional(),
    cpf: z.string().max(11, { message: 'Cannot exceed 11 caracters' }).optional(),
    rg: z.string().max(8, { message: 'Cannot exceed 8 caracters'}).optional(),
    cnpj: z.string().max(14, { message: 'Cannot exceed 14 caracters' }).optional(),
    contato1: z.string().optional(),
    contato2: z.string().optional(),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    uf: z.string().optional(),
    observacoes: z.string().optional(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  const squemaParam = z.object({
    id_beneficiario: z.coerce.number(),
  });
  
  type SchemaParam = z.infer<typeof squemaParam>;
  const paramValidationPipe = new ZodValidationPipe(squemaParam);
  
  @Controller('/beneficiario/:id_beneficiario')
  export class UpdateBeneficiarioController {
    constructor(private updateBeneficiario: UpdateBeneficiario) {}
  
    @Put()
    @HttpCode(200)
    async handle(
      @Param(paramValidationPipe)
      param: SchemaParam,
      @Body(validationPipe)
      body: Schema,
    ) {
      const beneficiario = await this.updateBeneficiario.execute({
        idBeneficiario: param.id_beneficiario,
        nome: body.nome,
        datanasc: body.datanasc,
        tipoPessoa: body.tipo_pessoa,
        genero: body.genero,
        cpf: body.cpf,
        rg: body.rg,
        cnpj: body.cnpj,
        contato1: body.contato1,
        contato2: body.contato2,
        cep: body.cep,
        logradouro: body.logradouro,
        numero: body.numero,
        complemento: body.complemento,
        bairro: body.bairro,
        cidade: body.cidade,
        uf: body.uf,
        observacoes: body.observacoes,
      });
  
      if (beneficiario) {
        return beneficiario;
      }
  
      return new BadRequestException();
    }
  }
  