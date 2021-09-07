import { Module, DynamicModule, Provider, Global, Logger } from '@nestjs/common';
import { ChangeHealthController } from './change-health.controller';
import { ChangeHealthService } from './change-health.service';
import { ChangeHealthOptions, ChangeHealthAsyncOptions } from './interfaces/change-health-module-options.interface';
import { CHANGE_HEALTH_OPTIONS } from './constants';
@Global()
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
  static register(
    options: ChangeHealthOptions,
  ): DynamicModule {
    return {
      module: ChangeHealthModule,
      providers: [
        {
          provide: CHANGE_HEALTH_OPTIONS,
          useValue: options,
        }
      ],
    };
  }

  static registerAsync(
    options: ChangeHealthAsyncOptions
  ): DynamicModule {
    return {
      module: ChangeHealthModule,
      imports: options.imports || [],
      providers: [
        options.useExisting,
        this.createAsyncProviders(options)
      ].filter(e => e),
    }
  }

  private static createAsyncProviders( options: ChangeHealthAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: CHANGE_HEALTH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass
    if (options.useClass) {
      return {
        provide: CHANGE_HEALTH_OPTIONS,
        useClass: options.useClass,
      };
    }

    // For useExisting...
    if (options.useExisting) {
      return {
        provide: CHANGE_HEALTH_OPTIONS,
        useExisting: options.useExisting,
      };
    }
  }
}
