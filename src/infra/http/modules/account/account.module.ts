import { Module } from '@nestjs/common'
import { AccountController } from './account.controller'
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AccountController],
  providers: [CreateUserUseCase],
})
export class AccountModule {}
