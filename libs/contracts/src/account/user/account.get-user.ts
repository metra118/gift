import { IsNumber } from 'class-validator'
import { ResponseError } from '../../common/response/response-error'
import { ResponseSuccess } from '../../common/response/response-success'

export const accountGetUserTopic = 'account.get-user.query'

export class AccountGetUserRequest {
  @IsNumber()
  userId: number
}

class AccountGetUserResponseSuccess extends ResponseSuccess {
  payload: {
    name: string
  }
}

export type AccountGetUserResponse =
  | AccountGetUserResponseSuccess
  | ResponseError
