import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller('test/subtest')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService
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
}
