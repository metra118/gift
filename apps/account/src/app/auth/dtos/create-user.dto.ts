import { ICreateUser } from '@gift/interfaces'

export class CreateUserDto implements ICreateUser {
  email: string
  passwordHash: string

  constructor(user: ICreateUser) {
    this.email = user.email
    this.passwordHash = user.passwordHash
  }
}
