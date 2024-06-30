import { Module } from '@nestjs/common'
import { AccountModule } from './modules/account/account.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AccountController } from './modules/account/account.controller'
import { CreateUserUseCase } from '@/domain/application/use-cases/user/create/create-user-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AccountController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
