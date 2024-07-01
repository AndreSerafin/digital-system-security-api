import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { SystemController } from './system.controller'
import { CreateSystemUseCase } from '@/domain/application/use-cases/system/create/create-system-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SystemController],
  providers: [CreateSystemUseCase],
})
export class SystemModule {}
