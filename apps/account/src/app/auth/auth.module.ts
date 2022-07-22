import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './services/auth.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from '../configs/jwt.config'
import { PrismaModule } from '../prisma/prisma.module'
import { PasswordService } from './services/password.service'
import { TokenService } from './services/token.service'

@Module({
  imports: [UserModule, PrismaModule, JwtModule.registerAsync(getJWTConfig())],
  providers: [AuthService, TokenService, PasswordService, AuthController],
})
export class AuthModule {}
