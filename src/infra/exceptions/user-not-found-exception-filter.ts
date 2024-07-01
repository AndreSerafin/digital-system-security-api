import { UserNotFoundException } from '@/domain/application/use-cases/user/exceptions/user-not-found-exception'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    })
  }
}
