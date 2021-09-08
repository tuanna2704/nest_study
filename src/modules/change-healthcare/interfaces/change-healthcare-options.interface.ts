import { ModuleMetadata, Type } from '@nestjs/common';
import { ChangeHealthcareFactory } from './change-healthcare-factory.interface';

export interface ChangeHealthcareOptions {
  host: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
}

export interface ChangeHealthcareAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ChangeHealthcareFactory>;
  useClass?: Type<ChangeHealthcareFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ChangeHealthcareOptions> | ChangeHealthcareOptions;
}
