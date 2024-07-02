import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateAccountDTO } from './dto/create-account'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('accounts')
@Controller('/accounts')
export class AccountController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body() body: CreateAccountDTO,
  ) {
    const { email, name, password, role } = body
    await this.createUserUseCase.execute({
      email,
      name,
      password,
      role,
      currentUserId: user.sub,
    })
  }
}
