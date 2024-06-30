import { Optional } from 'src/@types/optional'
import { Entity } from 'src/core/entity'
import { UniqueEntityId } from 'src/core/unique-entity-id'

interface UserProps {
  name: string
  email: string
  password: string

  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return user
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
