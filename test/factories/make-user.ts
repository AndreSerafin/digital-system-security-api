import { UniqueEntityId } from '@/core/unique-entity-id'
import { User, UserProps } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: UserRole.TECHINICAL_MANAGER,
      ...override,
    },
    id,
  )
  return user
}
