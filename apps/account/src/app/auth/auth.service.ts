import { BadRequestException, Injectable } from '@nestjs/common'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  AccountLogoutRequest,
  AccountLogoutResponse,
  AccountRefreshRequest,
  AccountRegisterRequest,
  AccountRegisterResponse,
} from '@gift/contracts'
import { JwtService } from '@nestjs/jwt'
import { Session } from '@prisma/client'
import { UserRepository } from '../user/user.repository'
import { UserEntity } from '../user/user.entity'
import { PasswordService } from './password.service'
import { PrismaService } from '../prisma/prisma.service'
import { SessionDto } from './session.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  // todo mb move to tokenService
  private async generateTokens(payload: Omit<UserEntity, 'passwordHash'>) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_COOKIE_MAX_AGE'),
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
    })
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_MAX_AGE'),
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  private async saveSession(sessionData: SessionDto): Promise<Session> {
    return this.prismaService.session.create({
      data: {
        ...sessionData,
        expiryDate: new Date(
          Date.now() +
            Number(
              this.configService.getOrThrow('REFRESH_TOKEN_COOKIE_MAX_AGE'),
            ) *
              1000,
        ),
      },
    })
  }

  async refresh(
    data: AccountRefreshRequest,
  ) /* : Promise<AccountRefreshResponse> */ {
    console.log(data)
  }

  async logout(data: AccountLogoutRequest): Promise<AccountLogoutResponse> {
    let isOk = true
    await this.prismaService.session
      .delete({
        where: {
          refreshToken: data.refreshToken,
        },
      })
      .catch(() => (isOk = false))

    return { ok: isOk }
  }

  async login(data: AccountLoginRequest): Promise<AccountLoginResponse> {
    const userCandidate = await this.userRepository.findUserByEmail(data.email)
    if (!userCandidate) {
      throw new BadRequestException('Неверный логин или пароль')
    }

    const isPassEquals = await this.passwordService.compare(
      userCandidate.passwordHash,
      data.password,
    )
    if (!isPassEquals) {
      throw new BadRequestException('Неверный логин или пароль')
    }
    const userEntity = new UserEntity(userCandidate)

    const tokens = await this.generateTokens({
      ...userEntity.getUserWithoutPassword(),
    })
    await this.saveSession(new SessionDto({ ...tokens, ...userCandidate }))
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async register(
    data: AccountRegisterRequest,
  ): Promise<AccountRegisterResponse> {
    const userCandidate = await this.userRepository.findUserByEmail(data.email)
    if (userCandidate) {
      throw new BadRequestException('Такой пользователь уже зарегистрирован')
    }
    const newUserEntity = new UserEntity({
      ...data,
      passwordHash: await this.passwordService.toHash(data.password),
    })
    const newUser = await this.userRepository.createUser(newUserEntity)
    // todo mail service here
    const tokens = await this.generateTokens({
      ...newUserEntity.getUserWithoutPassword(),
    })
    await this.saveSession(new SessionDto({ ...tokens, ...newUser }))
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
}
