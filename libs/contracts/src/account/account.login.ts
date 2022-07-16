import { IsEmail, IsString } from 'class-validator'

export const accountLoginTopic = 'account.login.command'

export class AccountLoginRequest {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class AccountLoginResponse {
  accessToken: string
  refreshToken: string
}
