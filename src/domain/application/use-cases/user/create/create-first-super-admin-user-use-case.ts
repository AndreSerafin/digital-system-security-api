import { Injectable } from '@nestjs/common'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { HashGenerator } from '@/domain/cryptography/hash-generator'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception'

export interface CreateFirstSuperAdminUserUseCaseRequest {
  name: string
  password: string
  email: string
}

export interface CreateFirstSuperAdminUserUseCaseResponse {
  user: User
}

@Injectable()
export class CreateFirstSuperAdminUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateFirstSuperAdminUserUseCaseRequest): Promise<CreateFirstSuperAdminUserUseCaseResponse> {
    const superAdminUsers = await this.usersRepository.findAll({
      role: UserRole.SUPER_ADMIN,
    })

    if (superAdminUsers.users.length !== 0) {
      throw new UserAlreadyExistsException(UserRole.SUPER_ADMIN)
    }
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsException(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
    })

    await this.usersRepository.create(user)

    return { user }
  }
}
