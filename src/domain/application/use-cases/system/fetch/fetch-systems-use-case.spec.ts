import { SystemStatus } from '@/domain/enterprise/entities/system/system-types'
import { InMemorySystemsRepository } from 'test/repositories/in-memory-systems-repository'
import { FetchSystemsUseCase } from './fetch-systems-use-case'
import { makeSystem } from 'test/factories/make-system'

let systemsRepository: InMemorySystemsRepository
let fetchSystemsUseCase: FetchSystemsUseCase

describe('Fetch Systems Use Case', () => {
  beforeEach(() => {
    systemsRepository = new InMemorySystemsRepository()
    fetchSystemsUseCase = new FetchSystemsUseCase(systemsRepository)
  })

  it('should be able to fetch systems', async () => {
    systemsRepository.items.push(makeSystem(), makeSystem(), makeSystem())

    const result = await fetchSystemsUseCase.execute({ page: 1 })
    expect(result.systems).toHaveLength(3)
  })

  it('should be able to filter systems', async () => {
    systemsRepository.items.push(
      makeSystem({
        description: 'System-01',
        acronym: 'System-01',
        attendanceEmail: 'attendanceemail1@example.com',
        status: SystemStatus.ACTIVE,
        url: 'http://fakeurl1.com',
      }),
      makeSystem({
        description: 'System-02',
        acronym: 'System-02',
        attendanceEmail: 'attendanceemail2@example.com',
        status: SystemStatus.ACTIVE,
        url: 'http://fakeurl2.com',
      }),
      makeSystem({
        description: 'System-03',
        acronym: 'System-03',
        attendanceEmail: 'attendanceemail3@example.com',
        status: SystemStatus.ACTIVE,
        url: 'http://fakeurl3.com',
      }),
    )

    const resultFilterAcronym = await fetchSystemsUseCase.execute({
      page: 1,
      acronym: 'System-01',
    })

    const resultFilterDescription = await fetchSystemsUseCase.execute({
      page: 1,
      acronym: 'System-02',
    })

    const resultFilterAttendanceEmail = await fetchSystemsUseCase.execute({
      page: 1,
      attendanceEmail: 'attendanceemail3@example.com',
    })

    expect(resultFilterAcronym.systems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ acronym: 'System-01' }),
      ]),
    )

    expect(resultFilterDescription.systems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ description: 'System-02' }),
      ]),
    )

    expect(resultFilterAttendanceEmail.systems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attendanceEmail: 'attendanceemail3@example.com',
        }),
      ]),
    )
  })
})
