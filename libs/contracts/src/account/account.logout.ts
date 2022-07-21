import { IsDefined } from 'class-validator'
import { ResponseError } from '../common/response/response-error'
import { ResponseSuccess } from '../common/response/response-success'
import { ILogout } from '@gift/interfaces'

export const accountLogoutKey = 'account.logout.command'

export class AccountLogoutRequest {
  @IsDefined()
  refreshToken: string
}

class AccountLogoutResponseSuccess extends ResponseSuccess {
  data: ILogout
}

export type AccountLogoutResponse = AccountLogoutResponseSuccess | ResponseError
