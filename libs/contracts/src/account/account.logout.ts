import { IsDefined } from 'class-validator'

export const accountLogoutTopic = 'account.logout.command'

export class AccountLogoutRequest {
  @IsDefined()
  refreshToken: string
}

export class AccountLogoutResponse {
  ok: boolean
}
