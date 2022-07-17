import { ISession } from '@gift/interfaces'

export class SessionDto {
  accessToken: string
  refreshToken: string
  userId: string

  constructor(data: Omit<ISession, 'sessionId'>) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.userId = data.userId
  }
}
