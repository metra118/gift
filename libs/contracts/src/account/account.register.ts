import { ITokens } from '@gift/interfaces'
import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator'
import { ResponseSuccess } from '../common/response/response-success'
import { ResponseError } from '../common/response/response-error'

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
  data: ITokens
}

export type AccountRegisterResponse =
  | AccountRegisterResponseSuccess
  | ResponseError
