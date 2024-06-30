import { Status } from '@/domain/enterprise/entities/system/system-types'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { System } from '@/domain/enterprise/entities/system/system'
import { GetSystemByIdUseCase } from './get-system-by-id-use-case'

let systemsRepository: InMemorySystemsRepository
let getSystemByIdUseCase: GetSystemByIdUseCase

describe('Fetch Systems Use Case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    getSystemByIdUseCase = new GetSystemByIdUseCase(systemsRepository)
  })

  it('should be able get a specific system by id', async () => {
    const system = System.create({
      authorId: 'author-01',
      description: 'System-01',
      acronym: 'System-01',
      attendanceEmail: 'attendanceemail1@example.com',
      status: Status.ACTIVE,
      url: 'http://fakeurl1.com',
    })

    const systemId = system.id.toString()

    systemsRepository.items.push(system)

    const result = await getSystemByIdUseCase.execute({ systemId })

    expect(result.system).toEqual(
      expect.objectContaining({
        description: 'System-01',
        acronym: 'System-01',
        attendanceEmail: 'attendanceemail1@example.com',
      }),
    )
  })
})
