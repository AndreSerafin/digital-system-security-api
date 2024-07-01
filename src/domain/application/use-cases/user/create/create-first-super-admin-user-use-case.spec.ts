import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateFirstSuperAdminUserUseCase } from './create-first-super-admin-user-use-case'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'
import { UserAlreadyExistsError } from '../exceptions/user-already-exists'

let fakeHasher: FakeHasher
let usersRepository: InMemoryUsersRepository
let createFirstSuperAdminUserUseCase: CreateFirstSuperAdminUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    createFirstSuperAdminUserUseCase = new CreateFirstSuperAdminUserUseCase(
      usersRepository,
      fakeHasher,
    )
  })

  it('should be able to create the first super admin user', async () => {
    await createFirstSuperAdminUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe2@example.com',
      password: '123456',
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe2@example.com',
      }),
    )
  })

  it('should not be able to create another super admin', async () => {
    usersRepository.items.push(makeUser({ role: UserRole.SUPER_ADMIN }))

    expect(
      async () =>
        await createFirstSuperAdminUserUseCase.execute({
          name: 'John Doe',
          email: 'johndoe2@example.com',
          password: '123456',
        }),
    ).rejects.toThrow(UserAlreadyExistsError)
  })
})
