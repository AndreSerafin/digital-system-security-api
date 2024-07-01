import { UserAlreadyExistsException } from '@/domain/application/use-cases/user/exceptions/user-already-exists-exception'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: UserAlreadyExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
    })
  }
}
