import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SystemFactory } from 'test/factories/make-system'
import { UserFactory } from 'test/factories/make-user'

describe('Get System by Id Controller (E2E)', () => {
  let userFactory: UserFactory
  let systemFactory: SystemFactory
  let app: INestApplication
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, SystemFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    systemFactory = moduleRef.get(SystemFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /systems/:sytemId', async () => {
    const user = await userFactory.makePrismaUser({
      role: UserRole.SYSTEM_ADMIN,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const system = await systemFactory.makePrismaSystem({
      authorId: user.id,
      acronym: 'SYS01',
    })
    const systemId = system.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/systems/${systemId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      system: expect.objectContaining({ acronym: 'SYS01' }),
    })
  })
})
