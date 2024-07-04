import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateAccountDTO } from './dto/create-account'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ApiTags } from '@nestjs/swagger'
import { FetchUsersUseCase } from '@/domain/application/use-cases/user/fetch/fetch-users-use-case'
import { FetchAccountsDTO } from './dto/fetch-accounts'
import { UserPresenter } from '../../presenters/account-presenter'

@ApiTags('accounts')
@Controller('/accounts')
export class AccountController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private fetchUsersUseCase: FetchUsersUseCase,
  ) {}

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

  @Get()
  async fetch(@Query() queryParams: FetchAccountsDTO) {
    const { page, email, name, role } = queryParams
    const { total, users } = await this.fetchUsersUseCase.execute({
      page,
      email,
      name,
      role,
    })

    return { total, users: users.map(UserPresenter.toHTTP) }
  }
}
