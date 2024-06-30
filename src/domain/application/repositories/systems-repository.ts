import { PaginationParams } from '@/core/repositories/pagination-params'
import { System } from 'src/domain/enterprise/entities/system/system'

export interface QueryParams {
  description: string
  acronym: string
  attendanceEmail: string
}

export abstract class SystemsRepository {
  abstract create(system: System): Promise<void>
  abstract findById(systemId: string): Promise<System | null>
  abstract findMany(
    paginationParams: PaginationParams,
    queryParams: Partial<QueryParams>,
  ): Promise<System[]>
}
