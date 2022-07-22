import { IUserToCreate } from '@gift/interfaces'

export class CreateUserDto implements IUserToCreate {
  email: string
  passwordHash: string

  constructor(user: IUserToCreate) {
    this.email = user.email
    this.passwordHash = user.passwordHash
  }
}
