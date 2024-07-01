import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { SystemController } from './system.controller'
import { CreateSystemUseCase } from '@/domain/application/use-cases/system/create/create-system-use-case'
import { FetchSystemsUseCase } from '@/domain/application/use-cases/system/fetch/fetch-systems-use-case'
import { GetSystemByIdUseCase } from '@/domain/application/use-cases/system/get/get-system-by-id-use-case'
import { DeleteSystemUseCase } from '@/domain/application/use-cases/system/delete/delete-system-use-case'
import { EditSystemUseCase } from '@/domain/application/use-cases/system/update/edit-system-use-case'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [SystemController],
  providers: [
    CreateSystemUseCase,
    FetchSystemsUseCase,
    GetSystemByIdUseCase,
    DeleteSystemUseCase,
    EditSystemUseCase,
  ],
})
export class SystemModule {}
