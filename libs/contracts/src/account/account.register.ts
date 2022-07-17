import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator'

export const accountRegisterTopic = 'account.register.command'

export class AccountRegisterRequest {
  @IsEmail()
  @MaxLength(320)
  email: string

  @IsDefined()
  @MinLength(8)
  @MaxLength(32)
  password: string
}

export class AccountRegisterResponse {
  accessToken: string
  refreshToken: string
}
