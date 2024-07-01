import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import {
  CreateAccountBodySchema,
  createAccountBodyValidationPipe,
} from './dto/create-account'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('accounts')
export class AccountController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body(createAccountBodyValidationPipe)
    { email, name, password, role }: CreateAccountBodySchema,
  ) {
    await this.createUserUseCase.execute({
      email,
      name,
      password,
      role,
      currentUserId: user.sub,
    })
  }
}
