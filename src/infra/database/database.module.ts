import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { PrismaSystemsRepository } from './prisma/repositories/prisma-systems-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: SystemsRepository,
      useClass: PrismaSystemsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, SystemsRepository],
})
export class DatabaseModule {}
