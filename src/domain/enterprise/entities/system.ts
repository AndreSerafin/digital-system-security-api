import { Optional } from 'src/@types/optional'
import { Entity } from 'src/core/entity'
import { UniqueEntityId } from 'src/core/unique-entity-id'

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface SystemProps {
  description: string
  acronym: string
  attendanceEmail: string
  url: string
  status: Status
  authorId: string
  lastChangeAuthorId?: string
  lastChangeJustification?: string
  newChangeJustification?: string

  createdAt: Date
  updatedAt?: Date | null
}

export class System extends Entity<SystemProps> {
  static create(
    props: Optional<SystemProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const system = new System(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return system
  }

  get description() {
    return this.props.description
  }

  get acronym() {
    return this.props.acronym
  }

  get attendanceEmail() {
    return this.props.attendanceEmail
  }

  get url() {
    return this.props.url
  }

  get status() {
    return this.props.status
  }

  get authorId() {
    return this.props.authorId
  }

  get lastChangeAuthorId() {
    return this.props.lastChangeAuthorId
  }

  get lastChangeJustification() {
    return this.props.lastChangeJustification
  }

  get newChangeJustification() {
    return this.props.newChangeJustification
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
