import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import baseConfig from 'src/config/configuration'

const config = ConfigModule.forRoot({
  // envFilePath: 'config/.env',
  load: [baseConfig],
})
@Module({
  imports: [config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
