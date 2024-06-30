import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateSystemUseCase } from './create-system-use-case'
import { makeUser } from 'test/factories/make-user'

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
      status: SystemStatus.ACTIVE,
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
    const systemAdminSystem = makeUser({ role: UserRole.SYSTEM_ADMIN })
    const techninicalManager = makeUser({ role: UserRole.TECHINICAL_MANAGER })

    usersRepository.items.push(systemAdminSystem, techninicalManager)

    const systemAdminUserId = systemAdminSystem.id.toString()
    const techninicalManagerUserId = techninicalManager.id.toString()

    const systemAdminResult = createSystemUseCase.execute({
      authorId: systemAdminUserId,
      description: 'Censo escolar web',
      acronym: 'CENSOWEB',
      attendanceEmail: 'attendanceemail@example.com',
      status: SystemStatus.ACTIVE,
      url: 'http://fakeurl.com',
    })

    const techninicalManagerResult = createSystemUseCase.execute({
      authorId: techninicalManagerUserId,
      description: 'Censo escolar web',
      acronym: 'CENSOWEB',
      attendanceEmail: 'attendanceemail@example.com',
      status: SystemStatus.ACTIVE,
      url: 'http://fakeurl.com',
    })

    expect(systemAdminResult).rejects.toThrow(NotAllowedError)
    expect(techninicalManagerResult).rejects.toThrow(NotAllowedError)
  })
})
