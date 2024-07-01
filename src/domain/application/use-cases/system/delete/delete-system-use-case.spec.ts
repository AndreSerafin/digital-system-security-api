import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import { UniqueEntityId } from '@/core/unique-entity-id'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { makeSystem } from 'test/factories/make-system'
import { makeUser } from 'test/factories/make-user'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteSystemUseCase } from './delete-system-use-case'

let systemsRepository: InMemorySystemsRepository
let usersRepository: InMemoryUsersRepository
let deleteSystemUseCase: DeleteSystemUseCase

describe('Delete System Use Case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    usersRepository = new InMemoryUsersRepository()
    deleteSystemUseCase = new DeleteSystemUseCase(
      systemsRepository,
      usersRepository,
    )
  })

  it('should be able to create an system as a super admin', async () => {
    const superAdminUser = makeUser(
      { role: UserRole.SUPER_ADMIN },
      new UniqueEntityId('user-01'),
    )

    usersRepository.items.push(superAdminUser)

    const system = makeSystem({}, new UniqueEntityId('system-01'))

    systemsRepository.items.push(system)

    const systemId = system.id.toString()

    await deleteSystemUseCase.execute({ userId: 'user-01', systemId })

    expect(systemsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a system as system admin or techninical resposible', async () => {
    const systemAdminSystem = makeUser(
      { role: UserRole.SYSTEM_ADMIN },
      new UniqueEntityId('user-01'),
    )
    const techninicalManager = makeUser(
      { role: UserRole.TECHINICAL_MANAGER },
      new UniqueEntityId('user-02'),
    )

    usersRepository.items.push(systemAdminSystem, techninicalManager)

    const system = makeSystem({}, new UniqueEntityId('system-01'))

    systemsRepository.items.push(system)

    const systemAdminResult = deleteSystemUseCase.execute({
      userId: 'user-01',
      systemId: 'system-01',
    })

    const techninicalManagerResult = deleteSystemUseCase.execute({
      userId: 'user-02',
      systemId: 'system-01',
    })

    expect(systemAdminResult).rejects.toThrow(NotAllowedException)
    expect(techninicalManagerResult).rejects.toThrow(NotAllowedException)
  })
})
