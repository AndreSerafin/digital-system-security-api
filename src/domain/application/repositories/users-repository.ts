import { User } from '@/domain/enterprise/entities/user/user'
import { UserRole } from '@/domain/enterprise/entities/user/user-types'

export interface QueryParams {
  email: string
  role: UserRole
  name: string
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findMany(queryParams: Partial<QueryParams>): Promise<User[]>
}
