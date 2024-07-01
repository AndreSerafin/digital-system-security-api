import { CreateSystemUseCase } from '@/domain/application/use-cases/system/create/create-system-use-case'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateSystemUserBodySchema } from './dto/create-system'

@Controller()
export class SystemController {
  constructor(private createSystemUseCase: CreateSystemUseCase) {}

  @Post()
  async create(
    @Body()
    {
      acronym,
      attendanceEmail,
      authorId,
      description,
      status,
      url,
    }: CreateSystemUserBodySchema,
  ) {
    this.createSystemUseCase.execute({
      acronym,
      attendanceEmail,
      authorId,
      description,
      status,
      url,
    })
  }
}
