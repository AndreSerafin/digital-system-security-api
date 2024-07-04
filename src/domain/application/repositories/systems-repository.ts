import { PaginationParams } from '@/core/repositories/pagination-params'
import { System } from 'src/domain/enterprise/entities/system/system'

export interface QueryParams {
  description: string
  acronym: string
  attendanceEmail: string
}

export interface FindMany {
  total: number
  systems: System[]
}

export abstract class SystemsRepository {
  abstract create(system: System): Promise<void>
  abstract findById(systemId: string): Promise<System | null>
  abstract findByEmail(email: string): Promise<System | null>
  abstract delete(systemId: string): Promise<void>
  abstract save(system: System): Promise<void>
  abstract findMany(
    paginationParams: PaginationParams,
    queryParams: Partial<QueryParams>,
  ): Promise<FindMany>
}
