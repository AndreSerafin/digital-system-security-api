import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export interface CreateUserUseCaseRequest {
  name: string
  password: string
  email: string
}

export interface CreateUserUseCaseResponse {}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: CreateUserUseCaseRequest) {
    const user = User.create({ email, name, password })

    await this.usersRepository.create(user)
  }
}
