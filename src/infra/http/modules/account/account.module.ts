import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { FetchUsersUseCase } from '@/domain/application/use-cases/user/fetch/fetch-users-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AccountController],
  providers: [CreateUserUseCase, FetchUsersUseCase],
})
export class AccountModule {}
