import { IUser, IUserInToken } from '@gift/interfaces'
import { UnauthorizedException } from '@nestjs/common'

export class UserEntity implements IUser {
  userId: string
  email: string
  passwordHash: string
  isActive: boolean
  firstName: string | null
  lastName: string | null
  nickname: string | null
  bio: string | null

  constructor(user: IUser) {
    this.userId = user.userId
    this.email = user.email
    this.passwordHash = user.passwordHash
    this.isActive = user.isActive
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.nickname = user.nickname
    this.bio = user.bio
  }

  getUserForTokens(): IUserInToken {
    if (!this.userId) throw new UnauthorizedException()
    return {
      userId: this.userId,
    }
  }
}
