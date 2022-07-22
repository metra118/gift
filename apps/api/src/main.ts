import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app/app.module'
import cookie from '@fastify/cookie'

const PORT = process.env.PORT || 3333

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  await app.register(cookie)
  await app.listen(PORT, '0.0.0.0')
  console.log('api was started')
}

bootstrap()
