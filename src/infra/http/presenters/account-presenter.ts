import { User } from '@/domain/enterprise/entities/user/user'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,

      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt ? user.updatedAt.toISOString() : null,
    }
  }
}
