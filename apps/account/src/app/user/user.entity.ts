import { cloneDeep } from 'lodash'
import { IUser, IUserInToken, PartialBy } from '@gift/interfaces'
import { UnauthorizedException } from '@nestjs/common'

export class UserEntity implements IUser {
  userId?: string
  email: string
  passwordHash: string

  constructor(user: IUser) {
    this.userId = user.userId
    this.email = user.email
    this.passwordHash = user.passwordHash
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  getUserForTokens(): IUserInToken {
    if (!this.userId) throw new UnauthorizedException()
    return {
      userId: this.userId,
    }
  }
}
