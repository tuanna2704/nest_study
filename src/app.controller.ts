import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  getHello(): string {
    // console.log(this.configService.get<string>('DATABASE_USER'))
    const test = this.configService.get<string>('test');
    return `${this.appService.getHello()} - ${test}`;
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  @Get('foo/subFoo')
  getFoo(): string {
    const { DATABASE_USER, DATABASE_PASSWORD } = process.env
    return `UserName: ${DATABASE_USER}, Password: ${DATABASE_PASSWORD}`
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  @Get('set_caching')
  async testCaching(): Promise<string> {
    await this.cacheManager.set('tuanna', 'stuff value');
    return 'Set cache page'
  }

  @Get('show_caching')
  async showCaching(): Promise<string> {
    console.log(this)
    const value = await this.cacheManager.get('tuanna');
    return 'Show cache page: ' + value
  }

  @Get('health_check')
  health(): string {
    return 'OK';
  }
}
