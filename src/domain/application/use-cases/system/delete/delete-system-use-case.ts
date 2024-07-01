import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import { ResourceNotFoundException } from '@/core/exceptions/resource-not-found-exception'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Injectable } from '@nestjs/common'

export interface DeleteSystemUseCaseRequest {
  userId: string
  systemId: string
}
export interface DeleteSystemUseCaseResponse {
  system: System
}

@Injectable()
export class DeleteSystemUseCase {
  constructor(
    private systemsRepository: SystemsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    systemId,
  }: DeleteSystemUseCaseRequest): Promise<DeleteSystemUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(userId)

    if (!currentUser) {
      throw new ResourceNotFoundException()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedException()
    }

    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundException()
    }

    await this.systemsRepository.delete(systemId)

    return { system }
  }
}
