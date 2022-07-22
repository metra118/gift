import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Session } from '@prisma/client'
import ms from 'ms'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateSessionDto } from '../dtos/create-session.dto'
import { ConfigService } from '@nestjs/config'
import { IUserInToken } from '@gift/interfaces'
import { UpdateSessionDto } from '../dtos/update-session.dto'

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

  updateTokens(updateSessionData: UpdateSessionDto) {
    return this.prismaService.session.update({
      where: {
        sessionId: updateSessionData.sessionId,
      },
      data: {
        ...updateSessionData,
        expiryDate: new Date(
          Date.now() +
            ms(this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN')),
        ),
      },
    })
  }

  async saveTokens(sessionData: CreateSessionDto): Promise<Session> {
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

  removeDeadTokens() {
    return this.prismaService.session.deleteMany({
      where: {
        expiryDate: {
          lte: new Date(),
        },
      },
    })
  }

  removeAllTokensByUserId(userId: string) {
    return this.prismaService.session.deleteMany({
      where: { userId },
    })
  }

  findTokensByRefresh(refreshToken: string) {
    return this.prismaService.session.findUnique({
      where: { refreshToken },
    })
  }

  removeTokensByRefreshToken(refreshToken: string) {
    return this.prismaService.session.delete({
      where: { refreshToken },
    })
  }
}
