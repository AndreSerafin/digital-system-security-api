import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate/authenticate-user-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticateUserDTO } from './dto/authenticate-user'

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @Public()
  async authenticate(
    @Body()
    body: AuthenticateUserDTO,
  ) {
    const { email, password } = body
    const { accessToken } = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    return {
      access_token: accessToken,
    }
  }
}
