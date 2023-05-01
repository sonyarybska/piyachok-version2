import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { ErrorMiddleware } from './errors/ErrorMiddleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { ValidationError } from 'class-validator';
import { ApiError } from './errors/CustomError';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ApiError(
          { message: 'Validation error', errors: validationErrors },
          400,
        );
      },
    }),
  );

  app.useGlobalFilters(new ErrorMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Piyachok')
    .setDescription('The Piyachok API description')
    .setVersion('1.0')
    .addTag('Establishments')
    .addBearerAuth({
      type: 'http',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(Number(process.env.PORT));
}
bootstrap();
