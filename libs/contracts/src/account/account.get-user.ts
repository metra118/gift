import { IsNumber } from 'class-validator'

export const accountGetUserTopic = 'account.get-user.query'

export class AccountGetUserRequest {
  @IsNumber()
  userId: number
}

export class AccountGetUserResponse {
  name: string
}
