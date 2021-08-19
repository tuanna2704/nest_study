import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AudioListener {
  @OnEvent('stuff_event')
  handleStuffEvent(eventData) {
    console.log(eventData)
  }
}