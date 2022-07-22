import { IsDefined } from 'class-validator'
import { ResponseError } from '../../common/response/response-error'
import { ResponseSuccess } from '../../common/response/response-success'
import { ILogout } from '@gift/interfaces'

export const accountLogoutAllKey = 'account.logouta-all.command'

export class AccountLogoutAllRequest {
  @IsDefined()
  userId: string
}

class AccountLogoutAllResponseSuccess extends ResponseSuccess {
  payload: ILogout
}

export type AccountLogoutAllResponse =
  | AccountLogoutAllResponseSuccess
  | ResponseError
