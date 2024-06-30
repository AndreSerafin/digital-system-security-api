import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Status } from '@/domain/enterprise/entities/system/system-types'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateSystemUseCase } from './create-system'

let systemsRepository: InMemorySystemsRepository
let usersRepository: InMemoryUsersRepository
let createSystemUseCase: CreateSystemUseCase

describe('Create System Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    systemsRepository = new InMemorySystemsRepository()
    createSystemUseCase = new CreateSystemUseCase(
      systemsRepository,
      usersRepository,
    )
  })

  it('should be able to create an system as a super admin', async () => {
    const superAdminUser = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.SUPER_ADMIN,
    })

    usersRepository.items.push(superAdminUser)

    const superAdminUserId = superAdminUser.id.toString()

    await createSystemUseCase.execute({
      authorId: superAdminUserId,
      description: 'Censo escolar web',
      acronym: 'CENSOWEB',
      attendanceEmail: 'attendanceemail@example.com',
      status: Status.ACTIVE,
      url: 'http://fakeurl.com',
    })

    expect(systemsRepository.items[0]).toEqual(
      expect.objectContaining({
        description: 'Censo escolar web',
        acronym: 'CENSOWEB',
        attendanceEmail: 'attendanceemail@example.com',
      }),
    )
  })

  it('should not be able to create a system as system admin or techninical resposible', async () => {
    const systemAdminSystem = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: UserRole.SYSTEM_ADMIN,
    })

    usersRepository.items.push(systemAdminSystem)

    const systemAdminSystemId = systemAdminSystem.id.toString()

    const result = createSystemUseCase.execute({
      authorId: systemAdminSystemId,
      description: 'Censo escolar web',
      acronym: 'CENSOWEB',
      attendanceEmail: 'attendanceemail@example.com',
      status: Status.ACTIVE,
      url: 'http://fakeurl.com',
    })

    expect(result).rejects.toThrow(NotAllowedError)
  })
})
