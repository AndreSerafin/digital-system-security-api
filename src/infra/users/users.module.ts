import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateFirstSuperAdminUserUseCase } from '@/domain/application/use-cases/user/create/create-first-super-admin-user-use-case'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  providers: [UsersService, CreateFirstSuperAdminUserUseCase],
})
export class UsersModule {}
