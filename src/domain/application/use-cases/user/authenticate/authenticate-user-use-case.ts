import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { Encrypter } from '@/domain/cryptography/encrypter'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { WrongCredentialsException } from '../exceptions/wrong-credentials-exception'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponse {
  accessToken: string
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new WrongCredentialsException()
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsException()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return { accessToken }
  }
}
