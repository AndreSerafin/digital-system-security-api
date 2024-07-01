import { NotAllowedException } from '@/core/exceptions/not-allowed-exception'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(NotAllowedException)
export class NotAllowedExceptionFilter implements ExceptionFilter {
  catch(exception: NotAllowedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: exception.message,
    })
  }
}
