import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { Injectable } from '@nestjs/common'

export interface EditSystemUseCaseRequest {
  userId: string
  systemId: string
  description?: string
  acronym?: string
  attendanceEmail?: string
  url?: string
  status?: SystemStatus
  updateJustification: string
}
export interface EditSystemUseCaseResponse {
  system: System
}

@Injectable()
export class EditSystemUseCase {
  constructor(
    private systemsRepository: SystemsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    systemId,
    acronym,
    attendanceEmail,
    description,
    status,
    url,
    updateJustification,
  }: EditSystemUseCaseRequest): Promise<EditSystemUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(userId)

    if (!currentUser) {
      throw new ResourceNotFoundError()
    }

    if (!currentUser.isSuperAdmin() && !currentUser.isSystemAdmin()) {
      throw new NotAllowedError()
    }

    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    system.update({
      acronym,
      attendanceEmail,
      description,
      status,
      url,
      lastUpdateAuthorId: currentUser.id,
      lastUpdateJustification: updateJustification,
    })

    await this.systemsRepository.save(system)

    return { system }
  }
}
