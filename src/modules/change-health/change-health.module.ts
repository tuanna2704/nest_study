import { Module } from '@nestjs/common';
import { ChangeHealthController } from './change-health.controller';
import { ChangeHealthService } from './change-health.service';

@Module({
  controllers: [
    ChangeHealthController
  ],
  providers: [
    ChangeHealthService
  ]
})
export class ChangeHealthModule {}
