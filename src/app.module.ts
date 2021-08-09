import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const config = ConfigModule.forRoot({
  envFilePath: 'config/.env'
})
@Module({
  imports: [config],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
