import { Optional } from 'src/@types/optional'
import { Entity } from 'src/core/entity'
import { UniqueEntityId } from 'src/core/unique-entity-id'

interface UserProps {
  name: string
  email: string
  password: string

  createdAt: Date
  updatedAt: Date
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }
}
