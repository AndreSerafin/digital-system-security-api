import { UniqueEntityId } from '@/core/unique-entity-id'
import { System, SystemProps } from '@/domain/enterprise/entities/system/system'
import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { PrismaSystemMapper } from '@/infra/database/prisma/mappers/system-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeSystem(
  override: Partial<SystemProps> = {},
  id?: UniqueEntityId,
) {
  const system = System.create(
    {
      authorId: new UniqueEntityId(),
      acronym: faker.lorem.word(),
      attendanceEmail: faker.internet.email(),
      description: faker.lorem.sentence(),
      status: SystemStatus.ACTIVE,
      url: faker.internet.url(),
      ...override,
    },
    id,
  )
  return system
}

@Injectable()
export class SystemFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaSystem(data: Partial<SystemProps> = {}): Promise<System> {
    const system = makeSystem(data)

    await this.prisma.system.create({
      data: PrismaSystemMapper.toPrisma(system),
    })

    return system
  }
}
