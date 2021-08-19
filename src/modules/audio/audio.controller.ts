import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Controller('audio')
export class AudioController {
  constructor(
    private httpService: HttpService,
    @InjectQueue('audio') private readonly audioQueue: Queue,
    private eventEmitter: EventEmitter2
  ) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    }, {delay: 30000});

    return this.audioQueue.getDelayed()
  }

  @Get('call_api')
  async callApi() {
    const a = this.httpService.get('https://api.github.com/users/tuanna2704').subscribe(a => {
      console.log(a)
    })
    console.log(a)
    return 'd'
  }

  @Get('test_event')
  async testEvent() {
    return this.eventEmitter.emit('stuff_event', {data: 'some stuff data was send when emit'});
  }
}