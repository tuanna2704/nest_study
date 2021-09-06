import { Controller, Get } from '@nestjs/common';
import { ChangeHealthService } from './change-health.service'
@Controller('change-health')
export class ChangeHealthController {
  constructor(
    private health: ChangeHealthService
  ) {}

  @Get()
  healthCheck(): string {
    return this.health.call();
  }
}
