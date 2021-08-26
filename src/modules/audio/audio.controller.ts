import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Res,
  StreamableFile,
  Render,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { createReadStream } from 'fs';
import { join } from 'path';
@Controller('audio')
export class AudioController {
  constructor(
    private httpService: HttpService,
    @InjectQueue('audio') private readonly audioQueue: Queue,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add(
      'transcode',
      {
        file: 'audio.mp3',
      },
      { delay: 30000 },
    );

    return this.audioQueue.getDelayed();
  }

  @Get('call_api')
  async callApi() {
    const a = this.httpService
      .get('https://api.github.com/users/tuanna2704')
      .subscribe((a) => {
        console.log(a);
      });
    console.log(a);
    return 'd';
  }

  @Get('test_event')
  async testEvent() {
    return this.eventEmitter.emit('stuff_event', {
      data: 'some stuff data was send when emit',
    });
  }

  // curl --location --request POST 'http://localhost:3000/audio/upload' --form 'file=@"/Users/tuannna2704/Downloads/avatar.jpeg"' --form 'another_field="data value"'
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(body);
    console.log(file);
  }

  @Get('demo_streaming_file')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  @Get('demo_mvc')
  @Render('index')
  getView() {
    return { message: 'Hello World!' };
  }
}
