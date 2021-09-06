import { Module } from '@nestjs/common';
import { ChangeHealthController } from './change-health.controller';

@Module({
  controllers: [
    ChangeHealthController
  ]
})
export class ChangeHealthModule {}
