import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindMany,
  QueryParams,
  UsersRepository,
} from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findMany(
    { page }: Partial<PaginationParams>,
    queryParams: Partial<QueryParams>,
  ): Promise<FindMany> {
    const { email, name, role } = queryParams
    const filters = (item: User) =>
      (email !== undefined ? item.email === email : true) &&
      (name !== undefined ? item.name === name : true) &&
      (role !== undefined ? item.role === role : true)

    const users = this.items.filter(filters)

    if (page) {
      return {
        total: this.items.length,
        users: users.slice((page - 1) * 20, page * 20),
      }
    }

    return { total: this.items.length, users }
  }

  async findAll(queryParams: Partial<QueryParams>): Promise<FindMany> {
    const { email, name, role } = queryParams
    const filters = (item: User) =>
      (email !== undefined ? item.email === email : true) &&
      (name !== undefined ? item.name === name : true) &&
      (role !== undefined ? item.role === role : true)

    const users = this.items.filter(filters)

    return { total: this.items.length, users }
  }
}
