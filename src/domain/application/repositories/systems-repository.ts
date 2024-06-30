import { PaginationParams } from '@/core/repositories/pagination-params'
import { System } from 'src/domain/enterprise/entities/system/system'

export interface QueryParams {
  description: string
  acronym: string
  attendanceEmail: string
}

export abstract class SystemsRepository {
  abstract create(system: System): Promise<void>
  abstract findMany(
    paginationParams: PaginationParams,
    queryParams: Partial<QueryParams>,
  ): Promise<System[]>
}
