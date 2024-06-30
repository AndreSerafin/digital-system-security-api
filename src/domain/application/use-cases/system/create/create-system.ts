import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Status } from '@/domain/enterprise/entities/system/system-types'
import { Injectable } from '@nestjs/common'

export interface CreateSystemUseCaseRequest {
  description: string
  acronym: string
  attendanceEmail: string
  url: string
  status: Status
  authorId: string
}

export interface CreateSystemUseCaseResponse {}

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
  }: CreateSystemUseCaseRequest) {
    const currentUser = await this.usersRepository.findById(authorId)

    if (!currentUser) {
      throw new ResourceNotFoundError()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedError()
    }

    const system = System.create({
      acronym,
      attendanceEmail,
      authorId,
      description,
      status,
      url,
    })

    await this.systemsRepository.create(system)
  }
}
