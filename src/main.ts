// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
  });
  app.use(cookieParser());
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

  await app.listen(3000);
}
bootstrap();
