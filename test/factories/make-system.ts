import { UniqueEntityId } from '@/core/unique-entity-id'
import { System, SystemProps } from '@/domain/enterprise/entities/system/system'
import { Status } from '@/domain/enterprise/entities/system/system-types'
import { faker } from '@faker-js/faker'

export function makeSystem(
  override: Partial<SystemProps> = {},
  id?: UniqueEntityId,
) {
  const system = System.create(
    {
      authorId: new UniqueEntityId(),
      acronym: faker.lorem.word(),
      attendanceEmail: faker.internet.email(),
      description: faker.lorem.sentence(),
      status: Status.ACTIVE,
      url: faker.internet.url(),
      ...override,
    },
    id,
  )
  return system
}
