import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ProductListener {
  @OnEvent('stuff_event')
  handleStuffEvent(eventData) {
    console.log('-----------')
    console.log('this log come from product listener')
    console.log(eventData);
    console.log('-----------')
  }
}