import { IsDefined } from 'class-validator'

export const accountRefreshTopic = 'account.refresh.command'

export class AccountRefreshRequest {
  @IsDefined()
  refreshToken: string
}

export class AccountRefreshResponse {
  accessToken: string
  refreshToken: string
}
