import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { WrongCredentialsExceptionFilter } from './exceptions/wrong-credentials-exception-filter'
import { ResourceNotFoundExceptionFilter } from './exceptions/resource-not-found-exception-filter'
import { UserNotFoundExceptionFilter } from './exceptions/user-not-found-exception-filter'
import { UserAlreadyExistsExceptionFilter } from './exceptions/user-already-exists-exception-filter'
import { NotAllowedExceptionFilter } from './exceptions/not-allowed-exception-filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ZodValidationPipe } from 'nestjs-zod'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Digital Security System')
    .setVersion('1.0')
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const envService = app.get(EnvService)
  app.useGlobalPipes(new ZodValidationPipe())
  app.useGlobalFilters(
    new WrongCredentialsExceptionFilter(),
    new UserNotFoundExceptionFilter(),
    new ResourceNotFoundExceptionFilter(),
    new UserAlreadyExistsExceptionFilter(),
    new NotAllowedExceptionFilter(),
  )
  await app.listen(envService.get('PORT'))
}
bootstrap()
