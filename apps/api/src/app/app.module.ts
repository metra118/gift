import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RMQModule } from 'nestjs-rmq'
import { getRMQConfig } from './configs/rmq.config'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  controllers: [UserController],
})
export class AppModule {}
