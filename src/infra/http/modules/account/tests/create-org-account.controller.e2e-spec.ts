import { UserRole } from '@/domain/enterprise/entities/user/user-types'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Create User Account Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, JwtService],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const user = await userFactory.makePrismaUser({
      role: UserRole.SUPER_ADMIN,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post(`/accounts`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        email: 'jonhdoe@example.com',
        name: 'John Doe',
        password: '123456',
        role: UserRole.TECHINICAL_MANAGER,
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findFirst({
      where: { email: 'jonhdoe@example.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
