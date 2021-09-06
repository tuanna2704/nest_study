import { ChangeHealthOptions } from './change-health-module-options.interface';

export interface ChangeHealthOptionsFactory {
  createOptions():
    | Promise<ChangeHealthOptions>
    | ChangeHealthOptions;
}