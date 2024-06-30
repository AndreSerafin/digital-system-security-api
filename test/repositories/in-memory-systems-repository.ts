import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  QueryParams,
  SystemsRepository,
} from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'

export class InMemorySystemsRepository implements SystemsRepository {
  public items: System[] = []

  async create(system: System): Promise<void> {
    this.items.push(system)
  }

  async findById(systemId: string): Promise<System | null> {
    const system = this.items.find((item) => item.id.toString() === systemId)

    if (!system) {
      return null
    }

    return system
  }

  async findMany(
    { page }: PaginationParams,
    queryParams: Partial<QueryParams>,
  ): Promise<System[]> {
    const { acronym, attendanceEmail, description } = queryParams

    const filters = (item: System) =>
      (acronym !== undefined ? item.acronym === acronym : true) &&
      (attendanceEmail !== undefined
        ? item.attendanceEmail === attendanceEmail
        : true) &&
      (description !== undefined ? item.description === description : true)

    const systems = this.items.filter(filters).slice((page - 1) * 20, page * 20)

    return systems
  }

  async save(system: System): Promise<void> {
    const systemId = system.id.toString()

    const systemIndex = this.items.findIndex(
      (item) => item.id.toString() === systemId,
    )

    this.items[systemIndex] = system
  }

  async delete(systemId: string): Promise<void> {
    const systemIndex = this.items.findIndex(
      (item) => item.id.toString() === systemId,
    )

    this.items.splice(systemIndex)
  }
}
