import { ChangeHealthOptions } from './change-health-module-options.interface';

export interface ChangeHealthOptionsFactory {
  createMassiveConnectOptions():
    | Promise<ChangeHealthOptions>
    | ChangeHealthOptions;
}