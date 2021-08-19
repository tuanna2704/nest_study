import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios'
@Controller('audio')
export class AudioController {
  constructor(
    private httpService: HttpService,
    @InjectQueue('audio') private readonly audioQueue: Queue
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
}