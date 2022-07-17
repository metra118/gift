import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../configs/jwt.config'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [UserModule, PrismaModule, JwtModule.registerAsync(getJWTConfig())],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
