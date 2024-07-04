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

describe('Fetch Systems Controller (E2E)', () => {
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

  test('[GET] /systems', async () => {
    const user = await userFactory.makePrismaUser({
      role: UserRole.SYSTEM_ADMIN,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      systemFactory.makePrismaSystem({
        authorId: user.id,
        acronym: 'SYS-01',
      }),
      systemFactory.makePrismaSystem({
        authorId: user.id,
        acronym: 'SYS-02',
      }),
      systemFactory.makePrismaSystem({
        authorId: user.id,
        acronym: 'SYS-03',
      }),
      systemFactory.makePrismaSystem({
        authorId: user.id,
        acronym: 'SYS-04',
      }),
      systemFactory.makePrismaSystem({
        authorId: user.id,
        acronym: 'SYS-05',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/systems`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ update_justification: 'system update test' })

    expect(response.statusCode).toBe(200)

    const systemsOnDatabase = await prisma.system.findMany()

    expect(systemsOnDatabase).toBeTruthy()

    expect(systemsOnDatabase).toHaveLength(5)

    expect(response.body).toEqual({
      total: 5,
      systems: expect.arrayContaining([
        expect.objectContaining({ acronym: 'SYS-01' }),
        expect.objectContaining({ acronym: 'SYS-02' }),
        expect.objectContaining({ acronym: 'SYS-03' }),
        expect.objectContaining({ acronym: 'SYS-04' }),
        expect.objectContaining({ acronym: 'SYS-05' }),
      ]),
    })
  })
})
