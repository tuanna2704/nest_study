// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as session from 'express-session';
import { resolve } from 'path';
import { Transport } from '@nestjs/microservices';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: console,
  });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      }
    }
  });
  
  app.use(cookieParser());
  app.use(compression());
  app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  }));

  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   })
  // )

  // Config Health Check and Swagger UI
  const config = new DocumentBuilder()
    // .setTitle('Cats example')
    // .setDescription('The cats API description')
    // .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
