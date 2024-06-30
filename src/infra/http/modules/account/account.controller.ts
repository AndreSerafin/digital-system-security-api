import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { Controller, Post } from '@nestjs/common'

@Controller('accounts')
export class AccountController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create() {
    return { hello: 'hello' }
  }
}
