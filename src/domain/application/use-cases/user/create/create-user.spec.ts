import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { User } from '@/domain/enterprise/entities/user/user'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create an user as a super admin', async () => {
    const superAdminUser = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.SUPER_ADMIN,
    })

    usersRepository.items.push(superAdminUser)

    const superAdminUserId = superAdminUser.id.toString()

    await createUserUseCase.execute({
      userId: superAdminUserId,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.TECHINICAL_MANAGER,
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    )
  })

  it('should not be able to create a user as system admin or techninical resposible', async () => {
    const systemAdminUser = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.SYSTEM_ADMIN,
    })

    usersRepository.items.push(systemAdminUser)

    const systemAdminUserId = systemAdminUser.id.toString()

    const result = createUserUseCase.execute({
      userId: systemAdminUserId,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.TECHINICAL_MANAGER,
    })

    expect(result).rejects.toThrow(NotAllowedError)
  })
})
