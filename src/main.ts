import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from './common/enum/configkeys.enum';
import { readFileSync } from 'fs';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get<string>(ConfigKeys.API_ROUTE));

  const appPackage = JSON.parse(readFileSync('package.json').toString());
  const options = new DocumentBuilder()
    .setTitle(appPackage.name)
    .setDescription(appPackage.description)
    .setVersion(appPackage.version)
    .setContact(
      appPackage.author.name,
      appPackage.author.url,
      appPackage.author.email,
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    `${configService.get<string>(
      ConfigKeys.API_ROUTE,
    )}/${configService.get<string>(ConfigKeys.API_SWAGGER)}`,
    app,
    document,
  );

  app.disable('x-powered-by');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Authorization', 'content-type'],
  });

  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(configService.get<number>(ConfigKeys.PORT_API));
}
bootstrap();
