import { ModuleMetadata, Type } from "@nestjs/common";
import { ChangeHealthOptionsFactory } from './change-health-options-factory.interface'
export interface ChangeHealthOptions {
  /**
   * server name or IP address
   */
  host: string;
}

export interface ChangeHealthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ChangeHealthOptionsFactory>;
  useClass?: Type<ChangeHealthOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ChangeHealthOptions> | ChangeHealthOptions;
}
