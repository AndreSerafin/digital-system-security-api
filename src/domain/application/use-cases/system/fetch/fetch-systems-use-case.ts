import { SystemsRepository } from '@/domain/application/repositories/systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { Injectable } from '@nestjs/common'

export interface FetchSystemsUseCaseRequest {
  page: number
  description?: string
  acronym?: string
  attendanceEmail?: string
}
export interface FetchSystemsUseCaseResponse {
  total: number
  systems: System[]
}

@Injectable()
export class FetchSystemsUseCase {
  constructor(private systemsRepository: SystemsRepository) {}

  async execute({
    page,
    acronym,
    attendanceEmail,
    description,
  }: FetchSystemsUseCaseRequest): Promise<FetchSystemsUseCaseResponse> {
    const result = await this.systemsRepository.findMany(
      { page },
      { acronym, attendanceEmail, description },
    )

    return result
  }
}
