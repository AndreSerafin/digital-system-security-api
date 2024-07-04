import { CreateSystemUseCase } from '@/domain/application/use-cases/system/create/create-system-use-case'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { FetchSystemsUseCase } from '@/domain/application/use-cases/system/fetch/fetch-systems-use-case'

import { GetSystemByIdUseCase } from '@/domain/application/use-cases/system/get/get-system-by-id-use-case'
import { DeleteSystemUseCase } from '@/domain/application/use-cases/system/delete/delete-system-use-case'

import { EditSystemUseCase } from '@/domain/application/use-cases/system/update/edit-system-use-case'
import { SystemPresenter } from '../../presenters/system-presenter'
import { ApiTags } from '@nestjs/swagger'
import { CreateSystemUserDTO } from './dto/create-system'
import { FetchSystemsDTO } from './dto/fetch-systems'
import { UpdateSystemUserDTO } from './dto/update-system'

@ApiTags('systems')
@Controller('/systems')
export class SystemController {
  constructor(
    private createSystemUseCase: CreateSystemUseCase,
    private fetchSystemsUseCase: FetchSystemsUseCase,
    private getSystemByIdUseCase: GetSystemByIdUseCase,
    private deleteSystemUseCase: DeleteSystemUseCase,
    private editSystemUseCase: EditSystemUseCase,
  ) {}

  @Post()
  async create(
    @Body()
    body: CreateSystemUserDTO,
    @CurrentUser() user: UserPayload,
  ) {
    const { acronym, attendance_email, description, status, url } = body

    await this.createSystemUseCase.execute({
      acronym,
      attendanceEmail: attendance_email,
      authorId: user.sub,
      description,
      status,
      url,
    })
  }

  @Get()
  async fetch(
    @Query()
    queryParams: FetchSystemsDTO,
  ) {
    const { page, acronym, attendance_email, description } = queryParams
    const result = await this.fetchSystemsUseCase.execute({
      page,
      acronym,
      attendanceEmail: attendance_email,
      description,
    })

    const systems = result.systems

    return { total: result.total, systems: systems.map(SystemPresenter.toHTTP) }
  }

  @Get('/:systemId')
  async getById(@Param('systemId') systemId: string) {
    const { system } = await this.getSystemByIdUseCase.execute({
      systemId,
    })

    return { system: SystemPresenter.toHTTP(system) }
  }

  @Delete('/:systemId')
  @HttpCode(204)
  async delete(
    @Param('systemId') systemId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const system = await this.deleteSystemUseCase.execute({
      systemId,
      userId: user.sub,
    })

    return system
  }

  @Patch('/:systemId')
  @HttpCode(204)
  async update(
    @Param('systemId') systemId: string,
    @CurrentUser() user: UserPayload,
    @Body()
    body: UpdateSystemUserDTO,
  ) {
    const {
      acronym,
      attendance_email,
      description,
      status,
      url,
      update_justification,
    } = body

    const result = await this.editSystemUseCase.execute({
      systemId,
      updateJustification: update_justification,
      userId: user.sub,
      acronym,
      attendanceEmail: attendance_email,
      description,
      status,
      url,
    })

    const system = result.system

    return { system: SystemPresenter.toHTTP(system) }
  }
}
