import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app/app.module'

const PORT = process.env.PORT || 3333

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.enableCors({
    origin: ['https://hoppscotch.io'],
  })
  await app.listen(PORT, '0.0.0.0')
}

bootstrap()