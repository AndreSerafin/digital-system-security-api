import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Create System Controller (E2E)', () => {
  let userFactory: UserFactory
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /systems', async () => {
    const user = await userFactory.makePrismaUser({
      role: UserRole.SUPER_ADMIN,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const mockSystem = {
      acronym: 'SYS1',
      attendanceEmail: 'system-01@example.com',
      description: 'Sytem 01 description',
      status: 'ACTIVE',
      url: 'http://system.com',
    }

    const response = await request(app.getHttpServer())
      .post(`/systems`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(mockSystem)

    expect(response.statusCode).toBe(201)

    console.log(response.statusCode)

    const systemsOnDatabase = await prisma.system.findFirst({
      where: {
        attendanceEmail: mockSystem.attendanceEmail,
      },
    })

    expect(systemsOnDatabase).toBeTruthy()
  })
})
