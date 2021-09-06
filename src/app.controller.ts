import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  Session,
  Sse,
  MessageEvent,
} from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Observable, interval, map } from 'rxjs';
import { ChangeHealthService } from 'src/modules/change-health/change-health.service'
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // private health: ChangeHealthService,
  ) {}

  @Get()
  getHello(): string {
    // console.log(this.configService.get<string>('DATABASE_USER'))
    const test = this.configService.get<string>('test');
    return `${this.appService.getHello()} - ${test}`;
  }

  @Get('health')
  healthCheck(): string {
    return 'this.health.call()';
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  @Get('foo/subFoo')
  getFoo(): string {
    const { DATABASE_USER, DATABASE_PASSWORD } = process.env;
    return `UserName: ${DATABASE_USER}, Password: ${DATABASE_PASSWORD}`;
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  // @Get('set_caching')
  // async testCaching(): Promise<string> {
  //   await this.cacheManager.set('tuanna', 'stuff value');
  //   return 'Set cache page';
  // }

  // @Get('show_caching')
  // async showCaching(): Promise<string> {
  //   console.log(this);
  //   const value = await this.cacheManager.get('tuanna');
  //   return 'Show cache page: ' + value;
  // }

  @Get('test_cookie')
  testCookie(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Show cookie request send
    console.log(request.cookies); // or "request.cookies['cookieKey']"

    // Attach cookie into response to set in client
    response.cookie('tuanna', 'nguyen anh tuan');
    // or console.log(request.signedCookies);
  }

  @Get('test_cookie_2')
  findAll(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // Show cookie request send
    console.log(request.cookies); // or "request.cookies['cookieKey']"

    // Attach cookie into response to set in client
    // response.cookie('tuanna', 'nguyen anh tuan')
    // or console.log(request.signedCookies);
  }

  @Get('test_session')
  testSession(
    @Session() session: Record<string, any>,
    @Req() request: Request,
  ) {
    console.log(session);
    console.log(request.cookies);
    session.visits = session.visits ? session.visits + 1 : 1;

    return session.visits;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(5000).pipe(
      map((index) => {
        return { data: { time: new Date() } };
      }),
    );
  }
}
