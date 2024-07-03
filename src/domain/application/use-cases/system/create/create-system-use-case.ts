import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { Injectable } from '@nestjs/common'
import { UserNotFoundException } from '../../user/exceptions/user-not-found-exception'

export interface CreateSystemUseCaseRequest {
  description: string
  acronym: string
  attendanceEmail?: string
  url: string
  status?: SystemStatus
  authorId: string
}

export interface CreateSystemUseCaseResponse {
  system: System
}

@Injectable()
export class CreateSystemUseCase {
  constructor(
    private systemsRepository: SystemsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    acronym,
    attendanceEmail,
    authorId,
    description,
    status,
    url,
  }: CreateSystemUseCaseRequest): Promise<CreateSystemUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(authorId)

    if (!currentUser) {
      throw new UserNotFoundException()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedException()
    }

    const system = System.create({
      acronym,
      attendanceEmail,
      authorId: new UniqueEntityId(authorId),
      description,
      status: status ?? SystemStatus.ACTIVE,
      url,
    })

    await this.systemsRepository.create(system)

    return { system }
  }
}
