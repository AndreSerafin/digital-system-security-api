import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import {
  CreateAccountBodySchema,
  createAccountBodyValidationPipe,
} from './dto/create-account'

@Controller('accounts')
export class AccountController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @Body(createAccountBodyValidationPipe)
    { email, name, password, role }: CreateAccountBodySchema,
  ) {
    await this.createUserUseCase.execute({
      email,
      name,
      password,
      role,
      userId: 'a5493793-f1cc-424b-aee1-d679c255ba76',
    })
  }
}
