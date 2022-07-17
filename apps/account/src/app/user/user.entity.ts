import { cloneDeep } from 'lodash'
import { IUser, PartialBy } from '@gift/interfaces'

export class UserEntity implements IUser {
  userId?: string
  email: string
  passwordHash: string

  constructor(user: IUser) {
    this.userId = user.userId
    this.email = user.email
    this.passwordHash = user.passwordHash
  }

  getUserWithoutPassword(): Omit<UserEntity, 'passwordHash'> {
    const copiedUser = cloneDeep(this) as PartialBy<UserEntity, 'passwordHash'>
    delete copiedUser.passwordHash
    return copiedUser
  }
}
