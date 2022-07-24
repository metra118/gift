import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  await app.init()
  console.log('account was started')
}

bootstrap()
