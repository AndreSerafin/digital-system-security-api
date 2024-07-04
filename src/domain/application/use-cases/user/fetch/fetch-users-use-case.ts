import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { Injectable } from '@nestjs/common'

export interface FetchUsersUseCaseRequest {
  page: number
  email?: string
  name?: string
  role?: UserRole
}
export interface FetchUsersUseCaseResponse {
  total: number
  users: User[]
}

@Injectable()
export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    email,
    name,
    role,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const result = await this.usersRepository.findMany(
      { page },
      { email, name, role },
    )

    return result
  }
}
