import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { WinstonModule, utilities } from 'nest-winston'
import * as winston from 'winston'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
  })

  const configService = app.get(ConfigService)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: [configService.get('APP_URL')],
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(configService.get('APP_PORT'), () => {
    console.log(`Server is running on ${configService.get('APP_API_URL')}`)
  })
}
bootstrap()
