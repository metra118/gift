import { ResponseSuccess } from '../../common/response/response-success'
import { ResponseError } from '../../common/response/response-error'
import { IsOk } from '@gift/interfaces'

export const accountRemoveDeadTokensKey = 'account.remove-dead-tokens.command'

export class AccountRemoveDeadTokensRequest {}

class AccountRemoveDeadTokensResponseSuccess extends ResponseSuccess {
  payload: IsOk
}

export type AccountRemoveDeadTokensResponse =
  | AccountRemoveDeadTokensResponseSuccess
  | ResponseError
