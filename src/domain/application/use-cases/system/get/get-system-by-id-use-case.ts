import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Injectable } from '@nestjs/common'

export interface GetSystemByIdUseCaseRequest {
  systemId: string
}
export interface GetSystemByIdUseCaseResponse {
  system: System
}

@Injectable()
export class GetSystemByIdUseCase {
  constructor(private systemsRepository: SystemsRepository) {}

  async execute({
    systemId,
  }: GetSystemByIdUseCaseRequest): Promise<GetSystemByIdUseCaseResponse> {
    const system = await this.systemsRepository.findById(systemId)

    if (!system) {
      throw new ResourceNotFoundError()
    }

    return { system }
  }
}
