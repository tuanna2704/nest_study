import { Module, DynamicModule, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  ChangeHealthcareOptions,
  ChangeHealthcareAsyncOptions,
} from './interfaces/change-healthcare-options.interface';
import { CHANGE_HEALTHCARE_OPTIONS } from './constants';
import { ChangeHealthcareService } from './change-healthcare.service';

@Module({
  imports: [HttpModule],
  providers: [ChangeHealthcareService],
  exports: [ChangeHealthcareService],
})
export class ChangeHealthcareModule {
  static register(options: ChangeHealthcareOptions): DynamicModule {
    return {
      module: ChangeHealthcareModule,
      providers: [
        {
          provide: CHANGE_HEALTHCARE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static registerAsync(options: ChangeHealthcareAsyncOptions): DynamicModule {
    return {
      module: ChangeHealthcareModule,
      imports: options.imports || [],
      providers: [
        options.useExisting,
        this.createAsyncProviders(options),
      ].filter((e) => e),
    };
  }

  private static createAsyncProviders(
    options: ChangeHealthcareAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CHANGE_HEALTHCARE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass
    if (options.useClass) {
      return {
        provide: CHANGE_HEALTHCARE_OPTIONS,
        useClass: options.useClass,
      };
    }

    // For useExisting...
    if (options.useExisting) {
      return {
        provide: CHANGE_HEALTHCARE_OPTIONS,
        useExisting: options.useExisting,
      };
    }
  }
}
