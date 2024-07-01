import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SystemFactory } from 'test/factories/make-system'
import { UserFactory } from 'test/factories/make-user'

describe('Update System Controller (E2E)', () => {
  let userFactory: UserFactory
  let systemFactory: SystemFactory
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, SystemFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    systemFactory = moduleRef.get(SystemFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /systems/:sytemId', async () => {
    const user = await userFactory.makePrismaUser({
      role: UserRole.SYSTEM_ADMIN,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const systemToUpdate = await systemFactory.makePrismaSystem({
      authorId: user.id,
    })
    const systemId = systemToUpdate.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/systems/${systemId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ update_justification: 'system update test' })

    expect(response.statusCode).toBe(204)

    const systemsOnDatabase = await prisma.system.findFirst({
      where: { lastUpdateJustification: 'system update test' },
    })

    expect(systemsOnDatabase).toBeTruthy()
  })
})
