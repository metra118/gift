import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Session } from '@prisma/client'
import ms from 'ms'
import { PrismaService } from '../prisma/prisma.service'
import { SessionDto } from './session.dto'
import { ConfigService } from '@nestjs/config'
import { IUserInToken } from '@gift/interfaces'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: IUserInToken) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
    })
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveTokens(sessionData: SessionDto): Promise<Session> {
    return this.prismaService.session.create({
      data: {
        ...sessionData,
        expiryDate: new Date(
          Date.now() +
            ms(this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN')),
        ),
      },
    })
  }

  removeAllTokens(userId: string) {
    return this.prismaService.session.deleteMany({
      where: { userId },
    })
  }

  findRefreshToken(refreshToken: string) {
    return this.prismaService.session.findUnique({
      where: { refreshToken },
    })
  }

  removeTokens(refreshToken: string) {
    return this.prismaService.session.delete({
      where: { refreshToken },
    })
  }
}
