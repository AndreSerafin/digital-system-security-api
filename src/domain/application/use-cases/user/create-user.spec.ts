import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    createUserUseCase.execute(mockUser)

    expect(usersRepository.items[0]).toEqual(expect.objectContaining(mockUser))
  })
})
