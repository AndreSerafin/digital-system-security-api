import { System } from 'src/domain/enterprise/entities/system/system'

export abstract class SystemsRepository {
  abstract create(system: System): Promise<void>
}
