import {
    Controller,
    Body,
    HttpCode,
    NotFoundException,
    Post,
  } from '@nestjs/common';
  
  import { z } from 'zod';
  import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
  import { AuthenticateUser } from 'src/inlar/actions/usuarios/authenticate-user';
  
  const squema = z.object({
    email: z.string().email(),
    senha: z.string(),
  });
  
  type Schema = z.infer<typeof squema>;
  const validationPipe = new ZodValidationPipe(squema);
  
  @Controller('/authenticate')
  export class AuthenticateUserController {
    constructor(private authenticateUser: AuthenticateUser) {}
  
    @Post()
    @HttpCode(200)
    async handle(
      @Body(validationPipe)
      body: Schema,
    ) {
      const usuario = await this.authenticateUser.execute({
        email: body.email,
        senha: body.senha,
      });
  
      if (usuario) {
        return usuario;
      }
  
      throw new NotFoundException();
    }
  }
  