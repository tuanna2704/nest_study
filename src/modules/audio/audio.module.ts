import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.procesor';
import { AudioListener } from './listeners/audio.listener';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AudioController],
  providers: [AudioProcessor, AudioListener],
})
export class AudioModule {}
