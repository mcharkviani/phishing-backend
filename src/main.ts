import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { swaggerConfig } from './shared/config/swagger.config';
import { loggerMiddleware } from './shared/middlewares/logger.middleware';

(async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  app.use(loggerMiddleware);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT ? +process.env.PORT : 5000;

  await app.listen(PORT, () =>
    logger.log(`Phishing api is listening to ${PORT}`),
  );
})();
