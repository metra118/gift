import { IsNumber } from 'class-validator'
import { ResponseError } from '../common/response-error'
import { ResponseSuccess } from '../common/response-success'

export const accountGetUserTopic = 'account.get-user.query'

export class AccountGetUserRequest {
  @IsNumber()
  userId: number
}

class AccountGetUserResponseSuccess extends ResponseSuccess {
  data: {
    name: string
  }
}

export type AccountGetUserResponse =
  | AccountGetUserResponseSuccess
  | ResponseError
