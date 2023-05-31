import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_URLS ? process.env.CORS_URLS.split(',') : [],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
