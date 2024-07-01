import { Injectable } from '@nestjs/common'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { ResourceNotFoundException } from '@/core/exceptions/resource-not-found-exception'
import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { HashGenerator } from '@/domain/cryptography/hash-generator'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception'

export interface CreateUserUseCaseRequest {
  name: string
  password: string
  email: string
  role: UserRole
  currentUserId: string
}

export interface CreateUserUseCaseResponse {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
    role,
    currentUserId,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const currentUser = await this.usersRepository.findById(currentUserId)

    if (!currentUser) {
      throw new ResourceNotFoundException()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedException()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsException(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({ email, name, password: hashedPassword, role })

    await this.usersRepository.create(user)

    return { user }
  }
}
