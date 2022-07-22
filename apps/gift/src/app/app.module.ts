import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getRMQConfig } from '@gift/account/src/app/configs/rmq.config'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { GiftModule } from './gift/gift.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRMQConfig()),
    GiftModule,
  ],
})
export class AppModule {}
