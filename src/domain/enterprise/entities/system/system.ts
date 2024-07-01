import { Optional } from 'src/@types/optional'
import { Entity } from 'src/core/entity'
import { UniqueEntityId } from 'src/core/unique-entity-id'
import { SystemStatus } from './system-types'

export interface SystemProps {
  description: string
  acronym: string
  attendanceEmail: string
  url: string
  status: SystemStatus
  lastUpdateJustification?: string | null
  lastUpdateAuthorId?: UniqueEntityId | null
  authorId: UniqueEntityId

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

  update(system: Partial<SystemProps>) {
    this.props.acronym = system.acronym ?? this.acronym
    this.props.attendanceEmail = system.attendanceEmail ?? this.attendanceEmail
    this.props.description = system.description ?? this.description
    this.props.url = system.url ?? this.url
    this.props.lastUpdateAuthorId =
      system.lastUpdateAuthorId ?? this.lastUpdateAuthorId
    this.props.lastUpdateJustification =
      system.lastUpdateJustification ?? this.lastUpdateJustification
    this.props.status = system.status ?? this.status

    this.touch()
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

  get lastUpdateAuthorId() {
    return this.props.lastUpdateAuthorId
  }

  get lastUpdateJustification() {
    return this.props.lastUpdateJustification
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
