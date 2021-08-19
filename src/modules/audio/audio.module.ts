import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.procesor';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AudioController],
  providers: [AudioProcessor],
})
export class AudioModule {}