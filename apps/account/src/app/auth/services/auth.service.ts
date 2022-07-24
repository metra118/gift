import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  AccountLoginRequest,
  AccountLogoutAllRequest,
  AccountLogoutRequest,
  AccountRefreshRequest,
  AccountRegisterRequest,
} from '@gift/contracts'
import { UserRepository } from '../../user/user.repository'
import { UserEntity } from '../../user/user.entity'
import { PasswordService } from './password.service'
import { CreateSessionDto } from '../dtos/create-session.dto'
import { TokenService } from './token.service'
import { ILogout, IsOk, ITokens } from '@gift/interfaces'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateSessionDto } from '../dtos/update-session.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async removeDeadTokens(): Promise<IsOk> {
    let isOk = true
    await this.tokenService.removeDeadTokens().catch(() => (isOk = false))

    return { isOk }
  }

  async refresh(data: AccountRefreshRequest): Promise<ITokens> {
    const tokenFromDb = await this.tokenService.findTokensByRefresh(
      data.refreshToken,
    )
    if (!tokenFromDb) {
      throw new UnauthorizedException()
    }
    const userCandidate = await this.userRepository.findById(data.user.userId)
    if (!userCandidate) {
      throw new BadRequestException()
    }
    const userEntity = new UserEntity(userCandidate)
    const tokens = await this.tokenService.generateTokens({
      ...userEntity.getUserForTokens(),
    })
    await this.tokenService.updateTokens(
      new UpdateSessionDto({
        ...tokens,
        userId: userCandidate.userId,
        sessionId: tokenFromDb.sessionId,
      }),
    )
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async logout(data: AccountLogoutRequest): Promise<ILogout> {
    let isOk = true
    await this.tokenService
      .removeTokensByRefreshToken(data.refreshToken)
      .catch(() => (isOk = false))

    return { isOk }
  }

  async logoutAll(data: AccountLogoutAllRequest): Promise<ILogout> {
    let isOk = true
    await this.tokenService
      .removeAllTokensByUserId(data.userId)
      .catch(() => (isOk = false))

    return { isOk }
  }

  async login(data: AccountLoginRequest): Promise<ITokens> {
    const userCandidate = await this.userRepository.findByEmail(data.email)
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
      new CreateSessionDto({ ...tokens, ...userCandidate }),
    )
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  async register(data: AccountRegisterRequest): Promise<ITokens> {
    const userCandidate = await this.userRepository.findByEmail(data.email)
    if (userCandidate) {
      throw new BadRequestException('Такой пользователь уже зарегистрирован')
    }
    const newUser = await this.userRepository.create(
      new CreateUserDto({
        ...data,
        passwordHash: await this.passwordService.hash(data.password),
      }),
    )
    const userEntity = new UserEntity(newUser)
    // todo mail service here
    const tokens = await this.tokenService.generateTokens({
      ...userEntity.getUserForTokens(),
    })
    await this.tokenService.saveTokens(
      new CreateSessionDto({ ...tokens, ...newUser }),
    )
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
}
