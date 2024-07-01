import { UniqueEntityId } from '@/core/unique-entity-id'
import { System } from '@/domain/enterprise/entities/system/system'
import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { Prisma, System as PrismaSystem } from '@prisma/client'

export class PrismaSystemMapper {
  static toDomain(raw: PrismaSystem): System {
    return System.create(
      {
        acronym: raw.acronym,
        attendanceEmail: raw.attendanceEmail,
        authorId: new UniqueEntityId(raw.authorId),
        description: raw.description,
        status: raw.status as SystemStatus,
        url: raw.url,
        createdAt: raw.createdAt,
        lastUpdateAuthorId: raw.lastUpdateAuthorId
          ? new UniqueEntityId(raw.lastUpdateAuthorId)
          : undefined,
        lastUpdateJustification: raw.lastUpdateJustification,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(system: System): Prisma.SystemUncheckedCreateInput {
    return {
      id: system.id.toString(),
      acronym: system.acronym,
      attendanceEmail: system.attendanceEmail,
      authorId: system.authorId.toString(),
      description: system.description,
      status: system.status,
      url: system.url,
      createdAt: system.createdAt,
      lastUpdateAuthorId: system.lastUpdateAuthorId?.toString(),
      lastUpdateJustification: system.lastUpdateJustification,
      updatedAt: system.updatedAt,
    }
  }
}
