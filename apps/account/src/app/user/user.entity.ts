import { IUser, IUserInToken, IUserProfile, PartialBy } from '@gift/interfaces'
import { UnauthorizedException } from '@nestjs/common'
import { cloneDeep } from 'lodash'

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

  updateProfile(userProfile: PartialBy<IUserProfile, 'userId'>): UserEntity {
    const cpUserProfile = cloneDeep(userProfile)
    delete cpUserProfile.userId
    return new UserEntity({ ...this, ...cpUserProfile })
  }

  getUserProfile(): IUserProfile {
    return {
      userId: this.userId,
      email: this.email,
      isActive: this.isActive,
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      bio: this.bio,
    }
  }

  getUserForTokens(): IUserInToken {
    if (!this.userId) throw new UnauthorizedException()
    return {
      userId: this.userId,
    }
  }
}
