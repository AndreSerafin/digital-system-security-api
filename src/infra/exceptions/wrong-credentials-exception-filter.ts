import { WrongCredentialsException } from '@/domain/application/use-cases/user/exceptions/wrong-credentials-exception'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(WrongCredentialsException)
export class WrongCredentialsExceptionFilter implements ExceptionFilter {
  catch(exception: WrongCredentialsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: exception.message,
    })
  }
}
