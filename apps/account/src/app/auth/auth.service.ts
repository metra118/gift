import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  AccountLoginRequest,
  AccountLoginResponse,
  AccountLogoutRequest,
  AccountLogoutResponse,
  AccountRefreshRequest,
  AccountRefreshResponse,
  AccountRegisterRequest,
  AccountRegisterResponse,
} from '@gift/contracts'
import { UserRepository } from '../user/user.repository'
import { UserEntity } from '../user/user.entity'
import { PasswordService } from './password.service'
import { SessionDto } from './session.dto'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async refresh(data: AccountRefreshRequest): Promise<AccountRefreshResponse> {
    const tokenFromDb = await this.tokenService.findRefreshToken(
      data.refreshToken,
    )
    if (!tokenFromDb) {
      throw new UnauthorizedException()
    }
    const userCandidate = await this.userRepository.findUserById(
      data.user.userId,
    )
    if (!userCandidate) {
      throw new BadRequestException()
    }
    await this.tokenService.removeTokens(data.refreshToken)
    const userEntity = new UserEntity(userCandidate)
    const tokens = await this.tokenService.generateTokens({
      ...userEntity.getUserForTokens(),
    })
    await this.tokenService.saveTokens(
      new SessionDto({ ...tokens, ...userCandidate }),
    )
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async logout(data: AccountLogoutRequest): Promise<AccountLogoutResponse> {
    let isOk = true
    await this.tokenService
      .removeTokens(data.refreshToken)
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

    const tokens = await this.tokenService.generateTokens({
      ...userEntity.getUserForTokens(),
    })
    await this.tokenService.saveTokens(
      new SessionDto({ ...tokens, ...userCandidate }),
    )
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
    const userEntity = new UserEntity({
      ...data,
      passwordHash: await this.passwordService.hash(data.password),
    })
    const newUser = await this.userRepository.createUser(userEntity)
    userEntity.setUserId(newUser.userId)
    // todo mail service here
    const tokens = await this.tokenService.generateTokens({
      ...userEntity.getUserForTokens(),
    })
    await this.tokenService.saveTokens(
      new SessionDto({ ...tokens, ...newUser }),
    )
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
}
