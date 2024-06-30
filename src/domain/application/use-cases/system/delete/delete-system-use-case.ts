import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
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
      throw new ResourceNotFoundError()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedError()
    }

    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    await this.systemsRepository.delete(systemId)

    return { system }
  }
}
