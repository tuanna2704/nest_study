import { Controller, Get, Query } from '@nestjs/common';
import { MessageProducerService } from 'src/modules/product/services/message-queue.service';

@Controller('product')
export class MonitorController {
  constructor(
    private readonly messageProducerService: MessageProducerService,
  ) {}
  
  @Get('abc')
  async getInvokeMsg(@Query('msg') msg:string){
    await this.messageProducerService.sendMessage(msg);
    return await this.messageProducerService.getDelayed(); 
  }
}
