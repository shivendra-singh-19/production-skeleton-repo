import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { tap, type Observable } from 'rxjs';

import { LoggerFactory } from './logger.service';

/**
 * Logs one line per API request, after the response is sent, at the `http`
 * level so request noise can be filtered out of the file separately from
 * application logs.
 *
 * Register it globally in app.module.ts:
 *
 * ```ts
 * providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }]
 * ```
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = LoggerFactory.create('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const startedAt = Date.now();

    const finish = (status: number, error?: Error): void => {
      const meta = {
        method: request.method,
        url: request.originalUrl,
        status,
        durationMs: Date.now() - startedAt,
        ip: request.ip,
        userAgent: request.get('user-agent'),
      };

      const message = `${request.method} ${request.originalUrl} ${status} ${meta.durationMs}ms`;

      // Anything from 400 up is an error. When something threw, the thrown value
      // goes on the record and brings its stack; when the handler just returned
      // the status, the status itself is the error.
      if (error) this.logger.error({ message, error, ...meta });
      else if (status >= 400)
        this.logger.error({ message, error: `responded ${status}`, ...meta });
      else this.logger.http({ message, ...meta });
    };

    return next.handle().pipe(
      tap({
        next: () => finish(http.getResponse<Response>().statusCode),
        // The exception filter has not run yet, so the status on the response is
        // not final — read it off the exception when it carries one.
        error: (error: Error & { status?: number }) =>
          finish(error.status ?? 500, error),
      }),
    );
  }
}
