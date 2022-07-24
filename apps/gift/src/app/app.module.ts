import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getRMQConfig } from '@gift/account/src/app/configs/rmq.config'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { GiftModule } from './gift/gift.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRMQConfig()),
    GiftModule,
    PrismaModule,
  ],
})
export class AppModule {}
