import { IsString } from 'class-validator'

export const accountLogoutTopic = 'account.logout.command'

export class AccountLogoutRequest {
  @IsString()
  refreshToken: string
}
