import { Injectable } from '@nestjs/common'
import {
  AccountRegisterRequest,
  AccountRegisterResponse,
} from '@gift/contracts'
import { UserRepository } from '../user/user.repository'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/user.entity'
import { Password } from '../../utils/Password.util'
import { PrismaService } from '../prisma/prisma.service'
import { ISession } from '@gift/interfaces'
import { Session } from '@prisma/client'
import { SessionDto } from './session.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  // todo mb move to tokenService
  generateTokens(payload: Omit<UserEntity, 'passwordHash'>) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      secret: process.env.JWT_ACCESS_SECRET,
    })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveSession(sessionData: SessionDto): Promise<Session> {
    return this.prismaService.session.create({
      data: sessionData,
    })
  }

  async register(
    data: AccountRegisterRequest,
  ): Promise<AccountRegisterResponse> {
    const userCandidate = await this.userRepository.findUserByEmail(data.email)
    if (userCandidate) {
      throw new Error('Такой пользователь уже зарегистрирован')
    }
    const newUserEntity = new UserEntity({
      ...data,
      passwordHash: await Password.toHash(data.password),
    })
    const newUser = await this.userRepository.createUser(newUserEntity)
    // todo mail service here
    const tokens = this.generateTokens({
      ...newUserEntity.getUserWithoutPassword(),
    })
    await this.saveSession(new SessionDto({ ...tokens, ...newUser }))
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
}
