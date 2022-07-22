import { ISession } from '@gift/interfaces'

export class UpdateSessionDto implements ISession {
  accessToken: string
  refreshToken: string
  userId: string
  sessionId: string

  constructor(data: ISession) {
    this.accessToken = data.accessToken
    this.refreshToken = data.refreshToken
    this.userId = data.userId
    this.sessionId = data.sessionId
  }
}
