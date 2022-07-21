import { IsDefined } from 'class-validator'
import { ResponseError } from '../common/response-error'
import { ResponseSuccess } from '../common/response-success'

export const accountLogoutKey = 'account.logout.command'

export class AccountLogoutRequest {
  @IsDefined()
  refreshToken: string
}

class AccountLogoutResponseSuccess extends ResponseSuccess {
  data: {
    ok: boolean
  }
}

export type AccountLogoutResponse =
  | AccountLogoutResponseSuccess
  | ResponseError
