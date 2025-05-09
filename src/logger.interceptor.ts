import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl } = req;

    const start = Date.now();

    console.log(`Request: ${method} ${originalUrl}`);

    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const duration = end - start;
        console.log(`Response: ${method} ${originalUrl} ${duration}ms`);
      }),
    );
  }
}
