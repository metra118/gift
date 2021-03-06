import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { getRMQConfig } from './configs/rmq.config'
import { UserController } from './controllers/user.controller'
import { AuthController } from './controllers/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from './configs/jwt.config'
import { ScheduleModule } from '@nestjs/schedule'
import { GiftController } from './controllers/gift.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController, AuthController, GiftController],
})
export class AppModule {}
