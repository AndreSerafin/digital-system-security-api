import { Injectable } from '@nestjs/common'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { UsersRepository } from '@/domain/application/repositories/users-repository'

export interface CreateUserUseCaseRequest {
  name: string
  password: string
  email: string
  role: UserRole
  userId: string
}

export interface CreateUserUseCaseResponse {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    role,
    userId,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(userId)

    if (!currentUser) {
      throw new ResourceNotFoundError()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedError()
    }

    const user = User.create({ email, name, password, role })

    await this.usersRepository.create(user)

    return { user }
  }
}
