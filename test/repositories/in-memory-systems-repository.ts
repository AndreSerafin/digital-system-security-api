import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'

export class InMemorySystemsRepository implements SystemsRepository {
  public items: System[] = []

  async create(system: System): Promise<void> {
    console.log('===> system', system)

    this.items.push(system)
  }

  async findById(systemId: string): Promise<System> {
    const system = this.items.find((item) => item.id.toString() === systemId)

    return system
  }
}
