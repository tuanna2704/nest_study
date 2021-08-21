import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor {
  showLog: boolean = false;

  constructor(showLog?: boolean) {
    this.showLog = showLog;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if(this.showLog) {
      console.log('Before Interceptor ...');
    }
    const now = Date.now();
    return this.showLog 
    ? next.handle().pipe(
        tap(() => console.log(`After Interceptor... ${Date.now() - now}ms`)),
        map(data => ({ data }))
      )
    : next.handle()
  }
}