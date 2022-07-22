import { ITokens } from '@gift/interfaces'
import { IsEmail, IsString } from 'class-validator'
import { ResponseError } from '../common/response/response-error'
import { ResponseSuccess } from '../common/response/response-success'

export const accountLoginKey = 'account.login.command'

export class AccountLoginRequest {
  @IsEmail()
  email: string

  @IsString()
  password: string
}

class AccountLoginResponseSuccess extends ResponseSuccess {
  payload: ITokens
}

export type AccountLoginResponse = AccountLoginResponseSuccess | ResponseError
