import { IUser, Optional } from '@gift/interfaces'

export class UserEntity implements IUser {
  userId: string
  email: string
  passwordHash: string

  constructor(user: Optional<IUser, 'userId'>) {
    if (user.userId) this.userId = user.userId
    this.email = user.email
    this.passwordHash = user.passwordHash
  }
}
