import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator'
import { ResponseSuccess } from '../common/response-success'
import { ResponseError } from '../common/response-error'

export const accountRegisterKey = 'account.register.command'

export class AccountRegisterRequest {
  @IsEmail()
  @MaxLength(320)
  email: string

  @IsDefined()
  @MinLength(8)
  @MaxLength(32)
  password: string
}

class AccountRegisterResponseSuccess extends ResponseSuccess {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export type AccountRegisterResponse =
  | AccountRegisterResponseSuccess
  | ResponseError
