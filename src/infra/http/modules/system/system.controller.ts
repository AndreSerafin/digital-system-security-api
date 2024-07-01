import { CreateSystemUseCase } from '@/domain/application/use-cases/system/create/create-system-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateSystemUserBodySchema } from './dto/create-system'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/systems')
export class SystemController {
  constructor(private createSystemUseCase: CreateSystemUseCase) {}

  @Post()
  async create(
    @Body()
    {
      acronym,
      attendanceEmail,
      description,
      status,
      url,
    }: CreateSystemUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    this.createSystemUseCase.execute({
      acronym,
      attendanceEmail,
      authorId: user.sub,
      description,
      status,
      url,
    })
  }
}
