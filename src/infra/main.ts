import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { WrongCredentialsExceptionFilter } from './exceptions/wrong-credentials-exception-filter'
import { ResourceNotFoundExceptionFilter } from './exceptions/resource-not-found-exception-filter'
import { UserNotFoundExceptionFilter } from './exceptions/user-not-found-exception-filter'
import { UserAlreadyExistsExceptionFilter } from './exceptions/user-already-exists-exception-filter'
import { NotAllowedExceptionFilter } from './exceptions/not-allowed-exception-filter'
import { ZodValidationPipe } from 'nestjs-zod'
import { DocumentConfig } from './docs-config'
import { SystemAlreadyExistsExceptionFilter } from './exceptions/system-already-exists-exception-filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  DocumentConfig(app)

  const envService = app.get(EnvService)
  app.enableCors()
  app.useGlobalPipes(new ZodValidationPipe())
  app.useGlobalFilters(
    new WrongCredentialsExceptionFilter(),
    new UserNotFoundExceptionFilter(),
    new ResourceNotFoundExceptionFilter(),
    new UserAlreadyExistsExceptionFilter(),
    new SystemAlreadyExistsExceptionFilter(),
    new NotAllowedExceptionFilter(),
  )
  await app.listen(envService.get('PORT'))
}
bootstrap()
