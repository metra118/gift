import { Injectable } from '@nestjs/common'
import {
  AccountRegisterRequest,
  AccountRegisterResponse,
} from '@gift/contracts'
import { UserRepository } from '../user/user.repository'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/user.entity'
import { Password } from '../../utils/Password.util'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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
    console.log(newUserEntity)
    // выписать токены
    // создать пользователя
    // создать сессию
    // вернуть токены
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }
  }
}
