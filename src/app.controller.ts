import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test/subtest')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const { abc } = process.env;
    return `${this.appService.getHello()} - ${abc}`;
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  @Get('foo/subFoo')
  getFoo(): string {
    const { DATABASE_USER, DATABASE_PASSWORD, abc } = process.env
    return `UserName: ${DATABASE_USER}, Password: ${DATABASE_PASSWORD}`
  }
}
