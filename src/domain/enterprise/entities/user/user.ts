import { Optional } from 'src/@types/optional'
import { Entity } from 'src/core/entity'
import { UniqueEntityId } from 'src/core/unique-entity-id'
import { UserRole } from './user-types'

export interface UserProps {
  name: string
  email: string
  password: string
  role: UserRole

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

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  public isSuperAdmin() {
    return this.role === UserRole.SUPER_ADMIN
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
