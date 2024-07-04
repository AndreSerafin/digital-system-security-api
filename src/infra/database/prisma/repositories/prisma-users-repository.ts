import {
  QueryParams,
  UsersRepository,
  FindMany,
} from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user/user'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/user-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({ data })
  }

  async findMany(
    { page }: PaginationParams,
    { email, name, role }: Partial<QueryParams>,
  ): Promise<FindMany> {
    const users = await this.prisma.user.findMany({
      where: { email, name, role },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    const total = await this.prisma.user.count({
      where: { email, name, role },
    })

    return {
      total,
      users: users.map(PrismaUserMapper.toDomain),
    }
  }

  async findAll({
    email,
    name,
    role,
  }: Partial<QueryParams>): Promise<FindMany> {
    const users = await this.prisma.user.findMany({
      where: { email, name, role },
    })

    const total = await this.prisma.user.count({
      where: { email, name, role },
    })

    return {
      total,
      users: users.map(PrismaUserMapper.toDomain),
    }
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { email } })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
