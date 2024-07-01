import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import { ResourceNotFoundException } from '@/core/exceptions/resource-not-found-exception'
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
      throw new ResourceNotFoundException()
    }

    if (!currentUser.isSuperAdmin() && !currentUser.isSystemAdmin()) {
      throw new NotAllowedException()
    }

    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundException()
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
