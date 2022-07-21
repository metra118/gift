import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../configs/jwt.config'
import { PrismaModule } from '../prisma/prisma.module'
import { PasswordService } from './password.service'
import { TokenService } from './token.service'

@Module({
  imports: [UserModule, PrismaModule, JwtModule.registerAsync(getJWTConfig())],
  providers: [AuthService, TokenService, PasswordService, AuthController],
  controllers: [],
})
export class AuthModule {}
