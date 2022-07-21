import { IsEmail, IsString } from 'class-validator'
import { ResponseError } from '../common/response-error'
import { ResponseSuccess } from '../common/response-success'

export const accountLoginKey = 'account.login.command'

export class AccountLoginRequest {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

class AccountLoginResponseSuccess extends ResponseSuccess {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export type AccountLoginResponse =
  | AccountLoginResponseSuccess
  | ResponseError
