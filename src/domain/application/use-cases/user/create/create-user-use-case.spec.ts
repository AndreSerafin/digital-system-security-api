import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user-use-case'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { User } from '@/domain/enterprise/entities/user/user'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let fakeHasher: FakeHasher
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    createUserUseCase = new CreateUserUseCase(usersRepository, fakeHasher)
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
      email: 'johndoe2@example.com',
      password: '123456',
      role: UserRole.TECHINICAL_MANAGER,
    })

    expect(usersRepository.items[1]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe2@example.com',
      }),
    )
  })

  it('should be able to hash user password upon creation', async () => {
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
      email: 'johndoe2@example.com',
      password: '123456',
      role: UserRole.TECHINICAL_MANAGER,
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(usersRepository.items[1].password).toEqual(hashedPassword)
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
