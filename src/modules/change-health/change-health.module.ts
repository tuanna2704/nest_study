import { Module, DynamicModule } from '@nestjs/common';
import { ChangeHealthController } from './change-health.controller';
import { ChangeHealthService } from './change-health.service';
import { ChangeHealthConnectOptions } from './interfaces/change-health-module-options.interface';
import { CHANGE_HEALTH_OPTIONS } from './constants';
@Module({
  controllers: [
    ChangeHealthController
  ],
  providers: [
    ChangeHealthService
  ],
  exports: [
    ChangeHealthService
  ]
})
export class ChangeHealthModule {
  public static register(
    options: ChangeHealthConnectOptions,
  ): DynamicModule {
    return {
      module: ChangeHealthModule,
      providers: [
        {
          provide: CHANGE_HEALTH_OPTIONS,
          useValue: options,
        }
      ],
      exports: [],
    };
  }
}
