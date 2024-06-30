import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { EditSystemUseCase } from './edit-system-use-case'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { makeSystem } from 'test/factories/make-system'
import { makeUser } from 'test/factories/make-user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let usersRepository: InMemoryUsersRepository
let systemsRepository: InMemorySystemsRepository
let editSystemUseCase: EditSystemUseCase

describe('Edit Systems Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    systemsRepository = new InMemorySystemsRepository()
    editSystemUseCase = new EditSystemUseCase(
      systemsRepository,
      usersRepository,
    )
  })

  it('should be able edit a system as super admin and system admin', async () => {
    const superAdminUser = makeUser(
      { role: UserRole.SUPER_ADMIN },
      new UniqueEntityId('user-01'),
    )
    const systemAdminUser = makeUser(
      { role: UserRole.SYSTEM_ADMIN },
      new UniqueEntityId('user-02'),
    )

    usersRepository.items.push(superAdminUser, systemAdminUser)

    const system = makeSystem(
      {
        authorId: new UniqueEntityId('author-01'),
        description: 'System-01',
        acronym: 'SYS01',
        attendanceEmail: 'attendanceemail1@example.com',
        status: SystemStatus.ACTIVE,
        url: 'http://fakeurl1.com',
      },
      new UniqueEntityId('system-01'),
    )

    const systemId = system.id.toString()

    systemsRepository.items.push(system)

    await editSystemUseCase.execute({
      systemId,
      userId: 'user-01',
      description: 'New System description edited by Super Admin',
      acronym: 'NSYS edited by Super Admin',
      attendanceEmail: 'edited_attendanceemail1@example.com',
      url: 'http://fakeurl-edited.com',
      status: SystemStatus.INACTIVE,
      updateJustification: 'Update justification edited by Super Admin',
    })

    expect(systemsRepository.items[0]).toEqual(
      expect.objectContaining({
        description: 'New System description edited by Super Admin',
        acronym: 'NSYS edited by Super Admin',
        attendanceEmail: 'edited_attendanceemail1@example.com',
        url: 'http://fakeurl-edited.com',
        status: SystemStatus.INACTIVE,
        lastUpdateJustification: 'Update justification edited by Super Admin',
      }),
    )

    await editSystemUseCase.execute({
      systemId,
      userId: 'user-02',
      description: 'New System description edited by System Admin',
      updateJustification: 'Update justification edited by System Admin',
    })

    expect(systemsRepository.items[0]).toEqual(
      expect.objectContaining({
        description: 'New System description edited by System Admin',
        lastUpdateJustification: 'Update justification edited by System Admin',
      }),
    )
  })

  it('should not be able edit a system as technical manager', async () => {
    const technicalManager = makeUser(
      { role: UserRole.TECHINICAL_MANAGER },
      new UniqueEntityId('user-01'),
    )

    usersRepository.items.push(technicalManager)

    const system = makeSystem(
      {
        authorId: new UniqueEntityId('author-01'),
        description: 'System-01',
        acronym: 'SYS01',
        attendanceEmail: 'attendanceemail1@example.com',
        status: SystemStatus.ACTIVE,
        url: 'http://fakeurl1.com',
      },
      new UniqueEntityId('system-01'),
    )

    const systemId = system.id.toString()

    systemsRepository.items.push(system)

    const result = editSystemUseCase.execute({
      systemId,
      userId: 'user-01',
      description: 'New System description edited by Super Admin',
      acronym: 'NSYS edited by Super Admin',
      attendanceEmail: 'edited_attendanceemail1@example.com',
      url: 'http://fakeurl-edited.com',
      status: SystemStatus.INACTIVE,
      updateJustification: 'Update justification edited by Super Admin',
    })

    expect(result).rejects.toThrow(NotAllowedError)
  })
})
