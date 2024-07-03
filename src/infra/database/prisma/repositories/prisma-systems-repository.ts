import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  QueryParams,
  SystemsRepository,
} from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaSystemMapper } from '../mappers/system-mapper'

@Injectable()
export class PrismaSystemsRepository implements SystemsRepository {
  constructor(private prisma: PrismaService) {}

  async create(system: System): Promise<void> {
    const data = PrismaSystemMapper.toPrisma(system)

    await this.prisma.system.create({ data })
  }

  async findById(systemId: string): Promise<System | null> {
    const system = await this.prisma.system.findFirst({
      where: { id: systemId },
    })

    if (!system) {
      return null
    }

    return PrismaSystemMapper.toDomain(system)
  }

  async delete(systemId: string): Promise<void> {
    await this.prisma.system.delete({
      where: { id: systemId },
    })
  }

  async save(system: System): Promise<void> {
    const data = PrismaSystemMapper.toPrisma(system)

    await this.prisma.system.update({
      where: {
        id: system.id.toString(),
      },
      data,
    })
  }

  async findMany(
    { page }: PaginationParams,
    { acronym, attendanceEmail, description }: Partial<QueryParams>,
  ): Promise<System[]> {
    const systems = await this.prisma.system.findMany({
      where: {
        acronym: { contains: acronym, mode: 'insensitive' },
        attendanceEmail: { contains: attendanceEmail, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return systems.map(PrismaSystemMapper.toDomain)
  }
}
