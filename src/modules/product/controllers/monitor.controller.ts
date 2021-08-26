import { Controller, Get, Query } from '@nestjs/common';
import { MessageProducerService } from 'src/modules/product/services/message-queue.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Controller('product')
export class MonitorController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('abc')
  async getInvokeMsg(@Query('msg') msg: string) {
    await this.messageProducerService.sendMessage(msg);
    return await this.messageProducerService.getDelayed();
  }

  @Get('test_event')
  async testEvent() {
    return this.eventEmitter.emit('stuff_event', {
      data: 'some stuff data was send when emit',
    });
  }
}
