import { Controller, Get, Inject } from '@nestjs/common';
import { ChangeHealthService } from './change-health.service'
import { CHANGE_HEALTH_OPTIONS } from './constants';
import { ChangeHealthOptions } from './interfaces/change-health-module-options.interface';

@Controller('change-health')
export class ChangeHealthController {
  constructor(
    private health: ChangeHealthService,
    @Inject(CHANGE_HEALTH_OPTIONS) private _options: ChangeHealthOptions,
  ) {}

  @Get()
  healthCheck(): string {
    console.log(this._options)
    return this.health.call();
  }
}
