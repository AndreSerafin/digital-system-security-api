import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'
import { Controller, Post } from '@nestjs/common'

@Controller('/accounts')
export class AccountController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private usersRepository: PrismaUsersRepository,
    private hashGenerator: BcryptHasher,
  ) {}

  @Post()
  async create() {
    return { hello: 'hello' }
  }
}
