import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  
  const config = new DocumentBuilder()
    .setTitle('Yo Ripe Chat')
    .setDescription('Yo Ripe Chat')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(APP.port);
}
bootstrap();
