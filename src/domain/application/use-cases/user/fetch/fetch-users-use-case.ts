import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { Injectable } from '@nestjs/common'

export interface FetchUsersUseCaseRequest {
  email?: string
  name?: string
  role?: UserRole
}
export interface FetchUsersUseCaseResponse {
  users: User[]
}

@Injectable()
export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    role,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ email, name, role })

    return { users }
  }
}
