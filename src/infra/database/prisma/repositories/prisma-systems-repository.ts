import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  QueryParams,
  SystemsRepository,
} from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaSystemsRepository implements SystemsRepository {
  create(system: System): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(systemId: string): Promise<System | null> {
    throw new Error('Method not implemented.')
  }

  delete(systemId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(system: System): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findMany(
    paginationParams: PaginationParams,
    queryParams: Partial<QueryParams>,
  ): Promise<System[]> {
    throw new Error('Method not implemented.')
  }
}
