import { IsNumber } from 'class-validator'

export const userGetUserTopic = 'user.get-user.query'

export class UserGetUserRequest {
  @IsNumber()
  userId: number
}

export class UserGetUserResponse {
  name: string
}
