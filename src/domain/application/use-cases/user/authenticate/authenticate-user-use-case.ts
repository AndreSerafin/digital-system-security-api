import { Injectable } from '@nestjs/common'
import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { Encrypter } from '@/domain/cryptography/encrypter'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { WrongCredentialError } from '../errors/wrong-credentials-error'

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
      throw new WrongCredentialError()
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return { accessToken }
  }
}
