import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test/subtest')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Go to this page by URL: /test/subTest/foo/subFoo
  @Get('foo/subFoo')
  getFoo(): string {
    return 'This is Foo'
  }
}
