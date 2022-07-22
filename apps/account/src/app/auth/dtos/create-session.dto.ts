import { ICreateSession } from '@gift/interfaces'

export class CreateSessionDto implements ICreateSession {
  accessToken: string
  refreshToken: string
  userId: string

  constructor(data: ICreateSession) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.userId = data.userId
  }
}
