import { CreateFirstSuperAdminUserUseCase } from '@/domain/application/use-cases/user/create/create-first-super-admin-user-use-case'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { EnvService } from '../env/env.service'

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    private createFirstSuperAdminUserUseCase: CreateFirstSuperAdminUserUseCase,
    private envService: EnvService,
  ) {}

  onApplicationBootstrap() {
    this.createFirstSuperAdminUserUseCase
      .execute({
        email: this.envService.get('FIRST_SUPER_ADMIN_EMAIL'),
        name: this.envService.get('FIRST_SUPER_ADMIN_NAME'),
        password: this.envService.get('FIRST_SUPER_ADMIN_PASSWORD'),
      })
      .catch(() => {})
  }
}
