import { User } from '@/domain/enterprise/entities/user/user'

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
}
