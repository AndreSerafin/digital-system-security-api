import { Injectable } from '@nestjs/common'

export interface CreateUserUseCaseRequest {}

export interface CreateUserUseCaseResponse {}

@Injectable()
export class CreateUserUseCase {
  async execute() {
    console.log('teste')
  }
}
