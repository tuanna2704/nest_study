import { Controller, Get, Inject } from '@nestjs/common';
import { ChangeHealthService } from './change-health.service'
import { CHANGE_HEALTH_OPTIONS } from './constants';
import { ChangeHealthOptionsFactory } from './interfaces';

@Controller('change-health')
export class ChangeHealthController {
  constructor(
    private health: ChangeHealthService,
    @Inject(CHANGE_HEALTH_OPTIONS) private _options: ChangeHealthOptionsFactory,
  ) {}

  @Get()
  healthCheck(): string {
    console.log(this._options.mustHaveFunction())
    return this.health.call();
  }
}
