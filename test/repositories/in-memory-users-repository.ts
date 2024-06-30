import { UsersRepository } from '@/domain/application/repositories/users-repository'
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
}
