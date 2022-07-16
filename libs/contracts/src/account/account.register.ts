import { IsEmail, IsString, Min } from 'class-validator'

export const accountRegisterTopic = 'account.register.command'

export class AccountRegisterRequest {
  @IsEmail()
  email: string

  @IsString()
  @Min(8)
  password: string
}

export class AccountRegisterResponse {
  accessToken: string
  refreshToken: string
}
