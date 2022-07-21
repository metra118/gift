import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { getRMQConfig } from './configs/rmq.config'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRMQConfig()),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
