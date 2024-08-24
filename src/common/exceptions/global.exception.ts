import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  constructor() {
    super()
  }

  catch(exception: any, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR
      let message = ''

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'Internal server error'
      } else {
        message = exception.response?.message || exception.message || 'Internal server error'
      }

      this.logger.error(`[${request.method}] ${request.url} - ${message}`, exception.stack)

      response.status(status).json({
        message,
      })
    } else {
      super.catch(exception, host)
    }
  }
}
