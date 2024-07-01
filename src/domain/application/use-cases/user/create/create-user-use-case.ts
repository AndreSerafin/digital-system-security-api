import { Injectable } from '@nestjs/common'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { HashGenerator } from '@/domain/cryptography/hash-generator'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

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
      throw new ResourceNotFoundError()
    }

    if (!currentUser.isSuperAdmin()) {
      throw new NotAllowedError()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({ email, name, password: hashedPassword, role })

    await this.usersRepository.create(user)

    return { user }
  }
}
