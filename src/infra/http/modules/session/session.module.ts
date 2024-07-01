import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate/authenticate-user-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SessionController],
  providers: [AuthenticateUserUseCase],
})
export class SessionModule {}
