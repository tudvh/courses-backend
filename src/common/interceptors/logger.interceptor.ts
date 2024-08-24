import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { DATE_FORMAT } from '../constants'

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_REQUEST')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const startTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        if (request.url) {
          this.logger.log(this.logRequest(request, response.statusCode, startTime, Date.now()))
        }
      }),
      catchError(error => {
        if (request.url) {
          const statusCode = error.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR
          this.logger.error(
            this.logRequest(request, statusCode, startTime, Date.now()),
            error.stack,
          )
        }
        throw error
      }),
    )
  }

  private logRequest(request: any, statusCode: number, startTime: number, endTime: number): string {
    return (
      `[${format(Date.now(), DATE_FORMAT.DATE_TIME_DASH)}] ` +
      `API: ${request.url} - ` +
      `METHOD: ${request.method} - ` +
      `USER_ID: ${request.user ? request.user.id : 'N/A'} - ` +
      `BODY: ${JSON.stringify(request.body)} - ` +
      `STATUS_CODE: ${statusCode} - ` +
      `TIME: ${endTime - startTime} ms`
    )
  }
}
