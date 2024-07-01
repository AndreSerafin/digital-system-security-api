import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FetchUsersUseCase } from './fetch-users-use-case'
import { makeUser } from 'test/factories/make-user'

let usersRepository: InMemoryUsersRepository
let fetchUsersUseCase: FetchUsersUseCase

describe('Fetch Users Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    fetchUsersUseCase = new FetchUsersUseCase(usersRepository)
  })

  it('should be able to fetch users', async () => {
    usersRepository.items.push(makeUser(), makeUser(), makeUser())

    const result = await fetchUsersUseCase.execute({})
    expect(result.users).toHaveLength(3)
  })
})
