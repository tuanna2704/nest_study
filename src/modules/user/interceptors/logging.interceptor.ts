import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Response } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor {
  showLog: boolean = false;

  constructor(showLog?: boolean) {
    console.log(showLog)
    this.showLog = showLog;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if(this.showLog) {
      console.log('Before...');
      console.log(context);
      console.log(next);
    }
    const now = Date.now();
    return this.showLog 
    ? next.handle().pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
        map(data => ({ data }))
      )
    : next.handle()
  }
}