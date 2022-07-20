import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RMQModule } from 'nestjs-rmq'
import { getRMQConfig } from './configs/rmq.config'
import { UserController } from './controllers/user.controller'
import { AuthController } from './controllers/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from './configs/jwt.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
  ],
  controllers: [UserController, AuthController],
})
export class AppModule {}
