import { Controller, Get } from '@nestjs/common';

@Controller('change-health')
export class ChangeHealthController {
  @Get()
  healthCheck(): string {
    return `${ChangeHealthController.name} alive`;
  }
}
