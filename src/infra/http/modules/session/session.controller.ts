import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate/authenticate-user-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import {
  AuthenticateUserBodySchema,
  authenticateUserBodyValidationPipe,
} from './dto/authenticate-user'
import { Public } from '@/infra/auth/public'

@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @Public()
  async authenticate(
    @Body(authenticateUserBodyValidationPipe)
    { email, password }: AuthenticateUserBodySchema,
  ) {
    const { accessToken } = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    return {
      access_token: accessToken,
    }
  }
}
