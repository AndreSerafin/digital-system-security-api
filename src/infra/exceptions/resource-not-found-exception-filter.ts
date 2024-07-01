import { ResourceNotFoundException } from '@/core/exceptions/resource-not-found-exception'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(ResourceNotFoundException)
export class ResourceNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: ResourceNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    })
  }
}
