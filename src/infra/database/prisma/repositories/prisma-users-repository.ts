import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(userId: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
}
