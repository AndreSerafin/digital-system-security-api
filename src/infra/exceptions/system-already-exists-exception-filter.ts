import { SystemAlreadyExistsException } from '@/domain/application/use-cases/system/exceptions/system-already-exists-exception'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(SystemAlreadyExistsException)
export class SystemAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: SystemAlreadyExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
    })
  }
}
